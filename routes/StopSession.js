const express = require("express");
const router = express.Router();
const pool = require("../index"); // Your PostgreSQL pool

// Update the session's endtimestamp
router.post("/", async (req, res) => {
    console.log("Received request for /StopSession route");

    try {
        const { sessionid, endtimestamp } = req.body;

        console.log("sessionid received:", sessionid, "endtimestamp received:", endtimestamp)

        const query = `
        UPDATE "SESSIONS"
        SET "endtimestamp" = $2
        WHERE "sessionid" = $1
        RETURNING *;
        `;

        const values = [sessionid, endtimestamp];

        const result = await pool.query(query, values);

        if (result.rowCount === 0) {
        return res.status(404).json({ message: "Session not found" });
        }

        res
        .status(200)
        .json({ message: "Session updated successfully", data: result.rows[0] });
    } catch (err) {
        console.error("Error updating session:", err);
        res.status(500).send("Server Error");
    }
    
});

module.exports = router;
