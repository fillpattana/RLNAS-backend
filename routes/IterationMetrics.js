const express = require("express");
const router = express.Router();
const pool = require("../index");

router.get("/", async (req, res) => {
  console.log("Received request for /IterationMetric route");
  const { agentNum, episodeNum } = req.query; // Extract query parameters

  try {
    let query = 'SELECT * FROM "ITERATIONMETRICS"';
    let params = [];

    if (agentNum && episodeNum) {
      query += ` WHERE graphid IN (
                  SELECT graphid FROM "GRAPH"
                  WHERE agentnum = $1 AND episodenum = $2
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
