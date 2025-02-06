// routes/IterationMetric.js

const express = require("express");
const router = express.Router();
const pool = require("../index"); // Import the pool from index.js (adjust path if necessary)

router.get("/", async (req, res) => {
  console.log("Received request for /IterationMetric route");
  const { graphId } = req.query; // Extract GraphId from query parameters

  try {
    let query = 'SELECT * FROM "IterationMetric"';
    const params = [];

    if (graphId) {
      query += ' WHERE "GraphId" = $1';
      params.push(graphId);
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
