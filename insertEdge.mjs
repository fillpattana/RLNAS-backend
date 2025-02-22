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
  { GraphId: 33, Sender: 0, Receiver: 1 },
  { GraphId: 33, Sender: 1, Receiver: 2 },
  { GraphId: 33, Sender: 2, Receiver: 3 },
  { GraphId: 33, Sender: 0, Receiver: 4 },
  { GraphId: 33, Sender: 4, Receiver: 5 },
  { GraphId: 33, Sender: 5, Receiver: 3 },
  { GraphId: 33, Sender: 4, Receiver: 6 },
  { GraphId: 33, Sender: 6, Receiver: 2 },
  { GraphId: 33, Sender: 3, Receiver: 7 },
  { GraphId: 33, Sender: 2, Receiver: 7 },
  { GraphId: 33, Sender: 7, Receiver: 8 },
  { GraphId: 33, Sender: 3, Receiver: 8 },
  { GraphId: 33, Sender: 8, Receiver: 9 },
  { GraphId: 33, Sender: 3, Receiver: 10 },
  { GraphId: 33, Sender: 10, Receiver: 9 },
  { GraphId: 33, Sender: 9, Receiver: 11 },
  { GraphId: 33, Sender: 10, Receiver: 11 },
];

const insertEdges = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    const queryText = `
      INSERT INTO "Edges" ("GraphId", "Sender", "Receiver")
      VALUES ($1, $2, $3)
    `;

    for (const edge of edges) {
      await client.query(queryText, [edge.GraphId, edge.Sender, edge.Receiver]);
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
