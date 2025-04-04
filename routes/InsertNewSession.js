const express = require("express");
const router = express.Router();
const pool = require("../index"); // Import the pool from index.js

// Insert session data into the database
router.post("/", async (req, res) => {
  try {
    const {
      datasetname,
      floatprecision,
      seed,
      batchsize,
      envseed,
      maxagents,
      maxepisodes,
      maxiterations,
      maxnodes,
      maxedges,
      agentseed,
      agentlearnrate,
      agentmode,
      agentbias,
    } = req.body;

    const query = `
      INSERT INTO "SESSIONS_CONFIG" (
        datasetname, floatprecision, seed, batchsize, envseed, maxagents, 
        maxepisodes, maxiterations, maxnodes, maxedges, agentseed, 
        agentlearnrate, agentmode, agentbias
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *;
    `;

    const values = [
      datasetname,
      floatprecision,
      seed,
      batchsize,
      envseed,
      maxagents,
      maxepisodes,
      maxiterations,
      maxnodes,
      maxedges,
      agentseed,
      agentlearnrate,
      agentmode,
      agentbias,
    ];

    const result = await pool.query(query, values);
    res
      .status(201)
      .json({ message: "Session inserted successfully", data: result.rows[0] });
  } catch (err) {
    console.error("Error inserting session data:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
