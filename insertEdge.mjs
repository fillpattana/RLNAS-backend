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

// Data to insert into Edges table
const edges = [
  { graphid: 62, sender: 0, receiver: 1 },
  { graphid: 62, sender: 1, receiver: 2 },
  { graphid: 62, sender: 2, receiver: 3 },
  { graphid: 62, sender: 0, receiver: 4 },
  { graphid: 62, sender: 4, receiver: 5 },
  { graphid: 62, sender: 5, receiver: 3 },
  { graphid: 62, sender: 4, receiver: 6 },
  { graphid: 62, sender: 6, receiver: 2 },
  { graphid: 62, sender: 3, receiver: 7 },
  { graphid: 62, sender: 2, receiver: 7 },
  { graphid: 62, sender: 7, receiver: 8 },
  { graphid: 62, sender: 3, receiver: 8 },
  { graphid: 62, sender: 8, receiver: 9 },
  { graphid: 62, sender: 3, receiver: 10 },
  { graphid: 62, sender: 10, receiver: 9 },
  { graphid: 62, sender: 9, receiver: 11 },
  { graphid: 62, sender: 10, receiver: 11 },
  { graphid: 62, sender: 11, receiver: 12 },
];

const insertEdges = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    const queryText = `
      INSERT INTO "EDGES" ("graphid", "sender", "receiver")
      VALUES ($1, $2, $3)
    `;

    for (const edge of edges) {
      await client.query(queryText, [edge.graphid, edge.sender, edge.receiver]);
    }

    await client.query("COMMIT"); // Commit transaction
    console.log("All edges inserted successfully.");
  } catch (err) {
    await client.query("ROLLBACK"); // Rollback in case of failure
    console.error("Transaction failed:", err);
  } finally {
    client.release(); // Release client back to the pool
  }
};

insertEdges();

export default pool;
