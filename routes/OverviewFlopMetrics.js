const express = require("express");
const router = express.Router();
const pool = require("../index");
const moment = require("moment");

router.get("/:timestamp", async (req, res) => {
  console.log(
    "Received request for IterationMetrics grouped by Agent and Episode for a specific timestamp"
  );

  const { timestamp } = req.params;
  console.log("Timestamp received:", timestamp);

  if (!moment(timestamp, "YYYY-MM-DD HH:mm:ss.SSSSSS", true).isValid()) {
    return res.status(400).json({ error: "Invalid timestamp format" });
  }
  try {
    // Fetch and sort agents
    const agentsResult = await pool.query(
      'SELECT DISTINCT agentnum FROM "GRAPH" WHERE runtimestamp = $1 ORDER BY agentnum ASC',
      [timestamp]
    );
    const agents = agentsResult.rows.map((row) => row.agentnum);

    let response = {};

    for (let agentNum of agents) {
      let agentKey = `AGENT${agentNum}`; // Labeling agent
      response[agentKey] = {};

      // Fetch and sort episodes for the agent
      const episodesResult = await pool.query(
        'SELECT DISTINCT episodenum FROM "GRAPH" WHERE agentnum = $1 AND runtimestamp = $2 ORDER BY episodenum ASC',
        [agentNum, timestamp]
      );
      const episodes = episodesResult.rows.map((row) => row.episodenum);

      for (let episodeNum of episodes) {
        let episodeKey = `EPISODE${episodeNum}`; // Labeling episode

        // Fetch the average accuracy for the episode, rounded to 3 decimal places
        const avgTrainingTimeResult = await pool.query(
          `SELECT ROUND(AVG(trainingtime::numeric), 3) AS avg_trainingtime 
           FROM "ITERATIONMETRICS"
           WHERE graphid IN (
             SELECT graphid FROM "GRAPH"
             WHERE agentnum = $1 AND episodenum = $2 AND runtimestamp = $3
           )`,
          [agentNum, episodeNum, timestamp]
        );

        let avg_trainingtime = avgTrainingTimeResult.rows[0].avg_trainingtime;
        response[agentKey][episodeKey] =
          avg_trainingtime !== null ? parseFloat(avg_trainingtime) : null;
      }
    }

    console.log("Query executed successfully:", response);
    res.json(response);
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
