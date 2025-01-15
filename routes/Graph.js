// routes/Graph.js
const express = require("express");
const router = express.Router();
const pool = require("../index"); // Import the pool from index.js (adjust path if necessary)

// Define the route for getting data from the Graph table
router.get("/", async (req, res) => {
  console.log("Received request for /Graph route");
  try {
    // Query the database for all rows in the "Graph" table
    const result = await pool.query('SELECT * FROM "Graph"');
    console.log("Query executed successfully:", result.rows);
    res.json(result.rows); // Send the results as JSON
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
