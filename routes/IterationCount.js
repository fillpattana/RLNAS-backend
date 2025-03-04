const express = require("express");
const router = express.Router();
const pool = require("../index");

// Define the route for getting the total number of Iterations from the Graph table
router.get("/:agentNum/:episodeNum", async (req, res) => {
  console.log(
    "Received request for /api/IterationCount/:agentNum/:episodeNum route"
  );

  const { agentNum, episodeNum } = req.params; // Get agentNum and episodeNum from route parameters
  console.log("agentNum received:", agentNum);
  console.log("episodeNum received:", episodeNum);

  if (isNaN(agentNum) || isNaN(episodeNum)) {
    return res
      .status(400)
      .json({ error: "agentNum and episodeNum must be numbers" });
  }

  try {
    const result = await pool.query(
      `SELECT COUNT(DISTINCT iterationnum) AS totaliterations 
       FROM "GRAPH" 
       WHERE agentnum = $1 AND episodenum = $2`,
      [agentNum, episodeNum]
    );

    console.log("Query executed successfully:", result.rows);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
