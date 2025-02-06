const express = require("express");
const router = express.Router();
const pool = require("../index"); // Import the pool from index.js (adjust path if necessary)

router.get("/", async (req, res) => {
  console.log("Received request for /IterationMetric route");
  const { agentNum, episodeNum } = req.query; // Extract query parameters

  try {
    let query = 'SELECT * FROM "IterationMetric"';
    let params = [];

    if (agentNum && episodeNum) {
      query += ` WHERE "GraphId" IN (
                  SELECT "GraphId" FROM "Graph"
                  WHERE "AgentNum" = $1 AND "EpisodeNum" = $2
                )`;
      params.push(agentNum, episodeNum);
    }

    const result = await pool.query(query, params);
    console.log("Query executed successfully:", result.rows);
    res.json(result.rows); // Send the results as JSON
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
