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

// Data to insert into GRAPH table
const graphs = [
  // {
  //   graphid: 56,
  //   runtimestamp: "2025-01-02 10:10:10",
  //   agentnum: 2,
  //   episodenum: 1,
  //   iterationnum: 8,
  // },
  // {
  //   graphid: 57,
  //   runtimestamp: "2025-01-02 10:10:10",
  //   agentnum: 1,
  //   episodenum: 7,
  //   iterationnum: 1,
  // },
  // {
  //   graphid: 58,
  //   runtimestamp: "2025-01-02 10:10:10",
  //   agentnum: 7,
  //   episodenum: 1,
  //   iterationnum: 1,
  // },
  {
    graphid: 59,
    runtimestamp: "2025-01-02 10:10:10",
    agentnum: 1,
    episodenum: 8,
    iterationnum: 1,
  },
];

const insertGraphs = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    const queryText = `
      INSERT INTO "GRAPH" ("graphid", "runtimestamp", "agentnum", "episodenum", "iterationnum")
      VALUES ($1, $2, $3, $4, $5)
    `;

    for (const graph of graphs) {
      await client.query(queryText, [
        graph.graphid,
        graph.runtimestamp,
        graph.agentnum,
        graph.episodenum,
        graph.iterationnum,
      ]);
    }

    await client.query("COMMIT"); // Commit transaction
    console.log("All graph entries inserted successfully.");
  } catch (err) {
    await client.query("ROLLBACK"); // Rollback in case of failure
    console.error("Transaction failed:", err);
  } finally {
    client.release(); // Release client back to the pool
  }
};

insertGraphs();

export default pool;
