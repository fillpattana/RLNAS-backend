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
const convolutionalLayers = [
  {
    GraphId: 23,
    NodeIndex: 1,
    ActivationType: "maxpool",
    NumOfFilter: 16,
    Padding: "same",
    KernelSize_X: 3,
    KernelSize_Y: 3,
    Stride: 1,
    Weights: [
      [
        [0.1, 0.54, 0.2, 0.47],
        [0.5, 0.32, 0.2, 0.15],
        [0.11, 0.76, 0.3, 0.2],
      ],
      [
        [0.1, 0.54, 0.2, 0.47],
        [0.5, 0.32, 0.2, 0.15],
        [0.11, 0.76, 0.3, 0.2],
      ],
    ],
    Biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    GraphId: 23,
    NodeIndex: 4,
    ActivationType: "sigmoid",
    NumOfFilter: 32,
    Padding: "valid",
    KernelSize_X: 5,
    KernelSize_Y: 5,
    Stride: 2,
    Weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    Biases: [0.05, 0.15],
  },
];

const insertConvolutionalLayers = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    const queryText = `
      INSERT INTO "Convolutional" 
      ("GraphId", "NodeIndex", "ActivationType", "NumOfFilter", "Padding", "KernelSize_X", "KernelSize_Y", "Stride", "Weights", "Biases")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10)
    `;

    for (const layer of convolutionalLayers) {
      const values = [
        layer.GraphId,
        layer.NodeIndex,
        layer.ActivationType,
        layer.NumOfFilter,
        layer.Padding,
        layer.KernelSize_X,
        layer.KernelSize_Y,
        layer.Stride,
        JSON.stringify(layer.Weights), // Convert to JSONB
        layer.Biases, // Already an array of numbers
      ];
      await client.query(queryText, values);
    }

    await client.query("COMMIT"); // Commit transaction
    console.log("All convolutional layers inserted successfully.");
  } catch (err) {
    await client.query("ROLLBACK"); // Rollback in case of failure
    console.error("Transaction failed:", err);
  } finally {
    client.release(); // Release client back to the pool
  }
};

insertConvolutionalLayers();

export default pool;
