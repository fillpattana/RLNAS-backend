const express = require("express");
const router = express.Router();
const pool = require("../index");

// Define the route for getting the total number of Episodes from the Graph table
router.get("/:agentNum", async (req, res) => {
  console.log("Received request for /api/EpisodeCount/:agentNum route");

  const { agentNum } = req.params; // Get agentNum from route parameter
  console.log("AgentNum received:", agentNum);

  if (isNaN(agentNum)) {
    return res.status(400).json({ error: "AgentNum is not a number" });
  }

  try {
    const result = await pool.query(
      'SELECT COUNT(DISTINCT episodenum) AS totalepisodes FROM "GRAPH" WHERE agentnum = $1',
      [agentNum]
    );
    console.log("Query executed successfully:", result.rows);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
