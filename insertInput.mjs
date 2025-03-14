import pkg from "pg";
const { Pool } = pkg;

// Create a connection pool
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "LOCAL_RLNAS",
  user: "Phil",
  password: "1234",
});

// Data to insert into Input table
const inputLayers = [
  { graphid: 23, nodeindex: 0 },
  { graphid: 24, nodeindex: 0 },
  { graphid: 25, nodeindex: 0 },
  { graphid: 26, nodeindex: 0 },
  { graphid: 27, nodeindex: 0 },
  { graphid: 28, nodeindex: 0 },
  { graphid: 29, nodeindex: 0 },
  { graphid: 30, nodeindex: 0 },
  { graphid: 31, nodeindex: 0 },
  { graphid: 32, nodeindex: 0 },
  { graphid: 52, nodeindex: 0 },
];

const insertInputLayers = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    const queryText = `
      INSERT INTO "INPUTS" ("graphid", "nodeindex")
      VALUES ($1, $2)
    `;

    for (const layer of inputLayers) {
      const values = [layer.graphid, layer.nodeindex];
      await client.query(queryText, values);
    }

    await client.query("COMMIT"); // Commit transaction
    console.log("All input layers inserted successfully.");
  } catch (err) {
    await client.query("ROLLBACK"); // Rollback in case of failure
    console.error("Transaction failed:", err);
  } finally {
    client.release(); // Release client back to the pool
  }
};

insertInputLayers();

export default pool;
