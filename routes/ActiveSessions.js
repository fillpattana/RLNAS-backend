const express = require("express");
const router = express.Router();
const pool = require("../index");

// Route to get all session information
router.get("/", async (req, res) => {
  console.log("Received request for /api/activesessions");

  try {
    // Query to fetch all session information
    const query = `
      SELECT 
          jsonb_build_object(
              'sessionInfo', jsonb_build_object(
                  'runtimestamp', s.runtimestamp,
                  'endtimestamp', s.endtimestamp,
                  'datasetname', sc.datasetname
              )
          ) AS session_data
      FROM "SESSIONS" s
      JOIN "SESSIONS_CONFIG" sc ON sc.sessionid = s.sessionid;
    `;

    // Execute query
    const result = await pool.query(query);

    // Check if data was found
    if (!result.rows.length) {
      return res.status(404).json({ error: "No sessions found" });
    }

    // Return all session data
    res.json(result.rows.map((row) => row.session_data));
  } catch (err) {
    console.error("Error querying the database:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
