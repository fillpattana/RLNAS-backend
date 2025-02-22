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

// Data to insert
const fullyConnectedLayers = [
  {
    GraphId: 23,
    NodeIndex: 2,
    NumOfNodes: 2,
    ActivationType: "relu",
    Weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    Biases: [0.2, 0.1],
  },
  {
    GraphId: 23,
    NodeIndex: 6,
    NumOfNodes: 1,
    ActivationType: "sigmoid",
    Weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    Biases: [0.2, 0.4],
  },
  {
    GraphId: 23,
    NodeIndex: 5,
    NumOfNodes: 3,
    ActivationType: "tanh",
    Weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    Biases: [0.12, 0.22],
  },
  {
    GraphId: 24,
    NodeIndex: 3,
    NumOfNodes: 6,
    ActivationType: "relu",
    Weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    Biases: [0.2, 0.1],
  },
  {
    GraphId: 25,
    NodeIndex: 7,
    NumOfNodes: 9,
    ActivationType: "sigmoid",
    Weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    Biases: [0.2, 0.4],
  },
  {
    GraphId: 27,
    NodeIndex: 8,
    NumOfNodes: 4,
    ActivationType: "tanh",
    Weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    Biases: [0.12, 0.22],
  },
  {
    GraphId: 29,
    NodeIndex: 9,
    NumOfNodes: 2,
    ActivationType: "relu",
    Weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    Biases: [0.2, 0.1],
  },
  {
    GraphId: 31,
    NodeIndex: 10,
    NumOfNodes: 16,
    ActivationType: "sigmoid",
    Weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    Biases: [0.2, 0.4],
  },
  {
    GraphId: 32,
    NodeIndex: 11,
    NumOfNodes: 24,
    ActivationType: "tanh",
    Weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    Biases: [0.12, 0.22],
  },
];

const insertFullyConnectedLayers = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    const queryText = `
      INSERT INTO "FullyConnected" ("GraphId", "NodeIndex", "NumOfNodes", "ActivationType", "Weights", "Biases")
      VALUES ($1, $2, $3, $4, $5::jsonb, $6)
    `;

    for (const layer of fullyConnectedLayers) {
      const values = [
        layer.GraphId,
        layer.NodeIndex,
        layer.NumOfNodes,
        layer.ActivationType,
        JSON.stringify(layer.Weights), // Convert to JSONB
        layer.Biases, // Already an array of numbers
      ];
      await client.query(queryText, values);
    }

    await client.query("COMMIT"); // Commit transaction
    console.log("All fully connected Layers inserted successfully.");
  } catch (err) {
    await client.query("ROLLBACK"); // Rollback in case of failure
    console.error("Transaction failed:", err);
  } finally {
    client.release(); // Release client back to the pool
  }
};

insertFullyConnectedLayers();

export default pool;
