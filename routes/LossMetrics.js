const express = require("express");
const router = express.Router();
const pool = require("../index");

router.get("/:timestamp", async (req, res) => {
  console.log("Received request for /api/LossMetric/:timestamp route");

  const { timestamp } = req.params; // Get timestamp from route parameter
  console.log("Timestamp received:", timestamp);

  if (isNaN(Date.parse(timestamp))) {
    return res.status(400).json({ error: "Invalid timestamp format" });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM "LOSSMETRICS" WHERE runtimestamp = $1',
      [timestamp]
    );
    console.log("Query executed successfully:", result.rows);
    res.json(result.rows); // Send the results as JSON
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
