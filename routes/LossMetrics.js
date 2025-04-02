const express = require("express");
const router = express.Router();
const moment = require("moment");
const pool = require("../index");

router.get("/:timestamp", async (req, res) => {
  console.log("Received request for /api/LossMetric/:timestamp route");

  const { timestamp } = req.params; // Get timestamp from route parameter
  console.log("Timestamp received:", timestamp);

  if (!moment(timestamp, "YYYY-MM-DD HH:mm:ss.SSSSSS", true).isValid()) {
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
