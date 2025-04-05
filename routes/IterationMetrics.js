const express = require("express");
const router = express.Router();
const moment = require("moment");
const pool = require("../index");

router.get("/:timestamp", async (req, res) => {
  console.log("Received request for /IterationMetric/:timestamp route");
  const { timestamp } = req.params;
  const { agentNum, episodeNum } = req.query; // Extract query parameters
  if (!moment(timestamp, "YYYY-MM-DD HH:mm:ss.SSSSSS", true).isValid()){
    return res.status(400).json({ error: "Invalid timestamp format" });
  }
  console.log("Timestamp received AGENTS PERFORMANCE CHART:", timestamp);
  try {
    let query = 'SELECT * FROM "ITERATIONMETRICS"';
    let params = [];

    if (agentNum && episodeNum) {
      query += ` WHERE graphid IN (
                  SELECT graphid FROM "GRAPH"
                  WHERE runtimestamp = $1 AND agentnum = $2 AND episodenum = $3
                  ORDER BY graphid ASC
                )`;
      params.push(timestamp, agentNum, episodeNum);
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
