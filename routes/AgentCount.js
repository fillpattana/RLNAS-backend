const express = require("express");
const router = express.Router();
const pool = require("../index"); // Import the pool from index.js

// Define the route for getting the total number of agents from the Graph table
router.get("/:timestamp", async (req, res) => {
  console.log("Received request for /api/AgentCount/:timestamp route");

  const { timestamp } = req.params; // Get timestamp from route parameter
  console.log("Timestamp received:", timestamp);

  if (isNaN(Date.parse(timestamp))) {
    return res.status(400).json({ error: "Invalid timestamp format" });
  }

  try {
    const result = await pool.query(
      'SELECT COUNT(DISTINCT "AgentNum") AS "TotalAgents" FROM "Graph" WHERE "RunTimeStamp" = $1',
      [timestamp]
    );
    console.log("Query executed successfully:", result.rows);
    res.json(result.rows[0]); // Send only the first row with the count
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
