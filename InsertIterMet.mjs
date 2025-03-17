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

const lossMetrics = [
  {
    runtimestamp: "2025-01-02 10:10:10",
    epoch: "1",
    loss: 2400,
  },
  {
    runtimestamp: "2025-01-02 10:10:10",
    epoch: "2",
    loss: 1398,
  },
  {
    runtimestamp: "2025-01-02 10:10:10",
    epoch: "3",
    loss: 9800,
  },
  {
    runtimestamp: "2025-01-02 10:10:10",
    epoch: "4",
    loss: 3908,
  },
  {
    runtimestamp: "2025-01-02 10:10:10",
    epoch: "5",
    loss: 4800,
  },
  {
    runtimestamp: "2025-01-02 10:10:10",
    epoch: "6",
    loss: 3800,
  },
  {
    runtimestamp: "2025-01-02 10:10:10",
    epoch: "7",
    loss: 4300,
  },
  {
    runtimestamp: "2025-01-02 10:10:10",
    epoch: "8",
    loss: 1923,
  },
  //   {
  //     runtimestamp: "2025-01-02 10:10:10",
  //     epoch: "9",
  //     loss: 2567,
  //   },
  //   {
  //     runtimestamp: "2025-01-02 10:10:10",
  //     epoch: "10",
  //     loss: 3889,
  //   },
  //   {
  //     runtimestamp: "2025-01-02 10:10:10",
  //     epoch: "11",
  //     loss: 5600,
  //   },
  //   {
  //     runtimestamp: "2025-01-02 10:10:10",
  //     epoch: "12",
  //     loss: 9200,
  //   },
  //   {
  //     runtimestamp: "2025-01-02 10:10:10",
  //     epoch: "13",
  //     loss: 4078,
  //   },
  //   {
  //     runtimestamp: "2025-01-02 10:10:10",
  //     epoch: "14",
  //     loss: 2976,
  //   },
  //   {
  //     runtimestamp: "2025-01-02 10:10:10",
  //     epoch: "15",
  //     loss: 1234,
  //   },
  //   {
  //     runtimestamp: "2025-01-02 10:10:10",
  //     epoch: "16",
  //     loss: 5525,
  //   },
  //   {
  //     runtimestamp: "2025-01-02 10:10:10",
  //     epoch: "17",
  //     loss: 9028,
  //   },
  //   {
  //     runtimestamp: "2025-01-02 10:10:10",
  //     epoch: "18",
  //     loss: 6472,
  //   },
  //   {
  //     runtimestamp: "2025-01-02 10:10:10",
  //     epoch: "19",
  //     loss: 3254,
  //   },
  //   {
  //     runtimestamp: "2025-01-02 10:10:10",
  //     epoch: "20",
  //     loss: 1647,
  //   },
];
const insertGraphs = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    const queryText = `
      INSERT INTO "LOSSMETRICS" ("runtimestamp", "epoch", "loss")
      VALUES ($1, $2, $3)
    `;

    for (const metrics of lossMetrics) {
      await client.query(queryText, [
        metrics.runtimestamp,
        metrics.epoch,
        metrics.loss,
      ]);
    }

    await client.query("COMMIT"); // Commit transaction
    console.log("All Loss Metrics entries inserted successfully.");
  } catch (err) {
    await client.query("ROLLBACK"); // Rollback in case of failure
    console.error("Transaction failed:", err);
  } finally {
    client.release(); // Release client back to the pool
  }
};

insertGraphs();

export default pool;
