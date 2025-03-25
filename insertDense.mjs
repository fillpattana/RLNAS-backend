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
const denseLayer1 = [
  {
    graphid: 23,
    nodeindex: 2,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 23,
    nodeindex: 3,
    numofnodes: 1,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 23,
    nodeindex: 5,
    numofnodes: 3,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 24,
    nodeindex: 6,
    numofnodes: 6,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 25,
    nodeindex: 7,
    numofnodes: 9,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 27,
    nodeindex: 8,
    numofnodes: 4,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 29,
    nodeindex: 9,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 31,
    nodeindex: 10,
    numofnodes: 16,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 32,
    nodeindex: 11,
    numofnodes: 24,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
];

const denseLayer2 = [
  {
    graphid: 23,
    nodeindex: 2,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 23,
    nodeindex: 3,
    numofnodes: 1,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 23,
    nodeindex: 5,
    numofnodes: 3,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },

  {
    graphid: 24,
    nodeindex: 2,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 24,
    nodeindex: 3,
    numofnodes: 1,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 24,
    nodeindex: 5,
    numofnodes: 3,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 24,
    nodeindex: 6,
    numofnodes: 6,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },

  {
    graphid: 25,
    nodeindex: 2,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 25,
    nodeindex: 3,
    numofnodes: 1,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 25,
    nodeindex: 5,
    numofnodes: 3,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 25,
    nodeindex: 6,
    numofnodes: 6,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 25,
    nodeindex: 7,
    numofnodes: 9,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },

  {
    graphid: 27,
    nodeindex: 2,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 27,
    nodeindex: 3,
    numofnodes: 1,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 27,
    nodeindex: 5,
    numofnodes: 3,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 27,
    nodeindex: 6,
    numofnodes: 6,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 27,
    nodeindex: 7,
    numofnodes: 9,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 27,
    nodeindex: 8,
    numofnodes: 4,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },

  {
    graphid: 29,
    nodeindex: 2,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 29,
    nodeindex: 3,
    numofnodes: 1,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 29,
    nodeindex: 5,
    numofnodes: 3,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 29,
    nodeindex: 6,
    numofnodes: 6,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 29,
    nodeindex: 7,
    numofnodes: 9,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 29,
    nodeindex: 8,
    numofnodes: 4,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 29,
    nodeindex: 9,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },

  {
    graphid: 31,
    nodeindex: 2,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 31,
    nodeindex: 3,
    numofnodes: 1,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 31,
    nodeindex: 5,
    numofnodes: 3,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 31,
    nodeindex: 6,
    numofnodes: 6,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 31,
    nodeindex: 7,
    numofnodes: 9,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 31,
    nodeindex: 8,
    numofnodes: 4,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 31,
    nodeindex: 9,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 31,
    nodeindex: 10,
    numofnodes: 16,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },

  {
    graphid: 32,
    nodeindex: 2,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 32,
    nodeindex: 3,
    numofnodes: 1,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 32,
    nodeindex: 5,
    numofnodes: 3,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 32,
    nodeindex: 6,
    numofnodes: 6,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 32,
    nodeindex: 7,
    numofnodes: 9,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 32,
    nodeindex: 8,
    numofnodes: 4,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 32,
    nodeindex: 9,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 32,
    nodeindex: 10,
    numofnodes: 16,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 32,
    nodeindex: 11,
    numofnodes: 24,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },

  {
    graphid: 52,
    nodeindex: 2,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 52,
    nodeindex: 3,
    numofnodes: 1,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 52,
    nodeindex: 5,
    numofnodes: 3,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 52,
    nodeindex: 6,
    numofnodes: 6,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 52,
    nodeindex: 7,
    numofnodes: 9,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 52,
    nodeindex: 8,
    numofnodes: 4,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 52,
    nodeindex: 9,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 52,
    nodeindex: 10,
    numofnodes: 16,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 52,
    nodeindex: 11,
    numofnodes: 24,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
];

const denseLayer3 = [
  {
    graphid: 28,
    nodeindex: 2,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 28,
    nodeindex: 3,
    numofnodes: 1,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 28,
    nodeindex: 5,
    numofnodes: 3,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 28,
    nodeindex: 6,
    numofnodes: 6,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 28,
    nodeindex: 7,
    numofnodes: 9,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 28,
    nodeindex: 8,
    numofnodes: 4,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
];

const denseLayer4 = [
  {
    graphid: 62,
    nodeindex: 2,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 62,
    nodeindex: 3,
    numofnodes: 1,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 62,
    nodeindex: 5,
    numofnodes: 3,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 62,
    nodeindex: 6,
    numofnodes: 6,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 62,
    nodeindex: 7,
    numofnodes: 9,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 62,
    nodeindex: 8,
    numofnodes: 4,
    activationtype: "tanh",
    weights: [
      [0.75, 0.12],
      [0.43, 0.56],
    ],
    biases: [0.12, 0.22],
  },
  {
    graphid: 62,
    nodeindex: 9,
    numofnodes: 2,
    activationtype: "relu",
    weights: [
      [0.1, 0.54, 0.2, 0.22],
      [0.1, 0.24, 0.52, 0.12],
    ],
    biases: [0.2, 0.1],
  },
  {
    graphid: 62,
    nodeindex: 10,
    numofnodes: 16,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 62,
    nodeindex: 11,
    numofnodes: 16,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
  {
    graphid: 62,
    nodeindex: 12,
    numofnodes: 19,
    activationtype: "sigmoid",
    weights: [
      [0.5, 0.32, 0.1],
      [0.12, 0.42, 0.33],
    ],
    biases: [0.2, 0.4],
  },
];

const insertDenseLayers = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    const queryText = `
      INSERT INTO "DENSE_LAYER" ("graphid", "nodeindex", "numofnodes", "activationtype", "weights", "biases")
      VALUES ($1, $2, $3, $4, $5::jsonb, $6)
    `;

    for (const layer of denseLayer4) {
      const values = [
        layer.graphid,
        layer.nodeindex,
        layer.numofnodes,
        layer.activationtype,
        JSON.stringify(layer.weights), // Convert to JSONB
        layer.biases, // Already an array of numbers
      ];
      await client.query(queryText, values);
    }

    await client.query("COMMIT"); // Commit transaction
    console.log("All Dense Layer's Nodes inserted successfully.");
  } catch (err) {
    await client.query("ROLLBACK"); // Rollback in case of failure
    console.error("Transaction failed:", err);
  } finally {
    client.release(); // Release client back to the pool
  }
};

insertDenseLayers();

export default pool;
