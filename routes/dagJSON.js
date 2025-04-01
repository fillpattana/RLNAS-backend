const express = require("express");
const router = express.Router();
const moment = require("moment");
const pool = require("../index"); // Ensure this correctly initializes the PostgreSQL connection

// Route to get the graph structure based on AgentNum, EpisodeNum, and IterationNum
router.get("/:timestamp/:agentNum/:episodeNum/:iterationNum", async (req, res) => {
  console.log(
    "Received request for /api/dagJSON/:agentNum/:episodeNum/:iterationNum"
  );

  const { timestamp, agentNum, episodeNum, iterationNum } = req.params;

  console.log("DAG JSON Parameters Received: AGENTNUM", agentNum, "EPISODENUM", episodeNum, "ITERATIONNUM", iterationNum)

  // Validate input parameters
  if (isNaN(agentNum) || isNaN(episodeNum) || isNaN(iterationNum)) {
    return res
      .status(400)
      .json({ error: "Invalid parameters, must be numbers" });
  }

  try {
    // Query to fetch the graph structure
    const query = `
      WITH SelectedGraph AS (
          SELECT graphid 
          FROM "GRAPH" 
          WHERE runtimestamp = $1 AND agentnum = $2 AND episodenum = $3 AND iterationnum = $4
      ),
      Nodes AS (
          SELECT 
              nodeindex,
              'convolutional' AS type,
              activationtype AS activation,
              weights AS weights,
              biases AS biases
          FROM "CONV_LAYER"
          WHERE graphid = (SELECT graphid FROM SelectedGraph)
          UNION ALL
          SELECT 
              nodeindex,
              'dense' AS type,
              activationtype AS activation,
              weights AS weights,
              biases AS biases
          FROM "DENSE_LAYER"
          WHERE graphid = (SELECT graphid FROM SelectedGraph)
          UNION ALL
          SELECT 
              nodeindex,
              'input' AS type,
              NULL AS activation,
              NULL AS weights,
              NULL AS biases
          FROM "INPUTS"
          WHERE graphid = (SELECT graphid FROM SelectedGraph)
      ),
      Edges AS (
          SELECT 
              array_agg(sender) AS senders,
              array_agg(receiver) AS receivers
          FROM "EDGES"
          WHERE graphid = (SELECT graphid FROM SelectedGraph)
      )
      SELECT jsonb_build_object(
          'Graph', jsonb_build_object(
              'nodes', jsonb_agg(
                  CASE 
                      WHEN type = 'input' THEN jsonb_build_object(
                          'index', nodeindex,
                          'type', type
                      )
                      ELSE jsonb_build_object(
                          'index', nodeindex,
                          'type', type,
                          'activation', jsonb_build_object('type', activation),
                          'params', jsonb_build_object(
                              'weights', weights,
                              'biases', biases
                          )
                      )
                  END
              ),
              'edges', (SELECT jsonb_build_object(
                  'senders', senders,
                  'receivers', receivers
              ) FROM EDGES)
          )
      ) AS graph_structure
      FROM NODES;
    `;

    // Execute query
    const result = await pool.query(query, [
      timestamp,
      agentNum,
      episodeNum,
      iterationNum,
    ]);

    // Check if a graph was found
    if (!result.rows.length || !result.rows[0].graph_structure) {
      return res.status(404).json({ error: "Graph not found" });
    }

    res.json(result.rows[0].graph_structure);
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
