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
const convolutionalLayers1 = [
  {
    graphid: 23,
    nodeindex: 1,
    activationtype: "maxpool",
    numoffilter: 16,
    padding: "same",
    kernelsize_x: 3,
    kernelsize_y: 3,
    stride: 1,
    weights: [
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
    biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    graphid: 23,
    nodeindex: 4,
    activationtype: "sigmoid",
    numoffilter: 32,
    padding: "valid",
    kernelsize_x: 5,
    kernelsize_y: 5,
    stride: 2,
    weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    biases: [0.05, 0.15],
  },
];

const convolutionalLayers2 = [
  {
    graphid: 23,
    nodeindex: 1,
    activationtype: "maxpool",
    numoffilter: 16,
    padding: "same",
    kernelsize_x: 3,
    kernelsize_y: 3,
    stride: 1,
    weights: [
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
    biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    graphid: 23,
    nodeindex: 4,
    activationtype: "sigmoid",
    numoffilter: 32,
    padding: "valid",
    kernelsize_x: 5,
    kernelsize_y: 5,
    stride: 2,
    weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    biases: [0.05, 0.15],
  },

  {
    graphid: 24,
    nodeindex: 1,
    activationtype: "maxpool",
    numoffilter: 16,
    padding: "same",
    kernelsize_x: 3,
    kernelsize_y: 3,
    stride: 1,
    weights: [
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
    biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    graphid: 24,
    nodeindex: 4,
    activationtype: "sigmoid",
    numoffilter: 32,
    padding: "valid",
    kernelsize_x: 5,
    kernelsize_y: 5,
    stride: 2,
    weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    biases: [0.05, 0.15],
  },

  {
    graphid: 25,
    nodeindex: 1,
    activationtype: "maxpool",
    numoffilter: 16,
    padding: "same",
    kernelsize_x: 3,
    kernelsize_y: 3,
    stride: 1,
    weights: [
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
    biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    graphid: 25,
    nodeindex: 4,
    activationtype: "sigmoid",
    numoffilter: 32,
    padding: "valid",
    kernelsize_x: 5,
    kernelsize_y: 5,
    stride: 2,
    weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    biases: [0.05, 0.15],
  },

  {
    graphid: 26,
    nodeindex: 1,
    activationtype: "maxpool",
    numoffilter: 16,
    padding: "same",
    kernelsize_x: 3,
    kernelsize_y: 3,
    stride: 1,
    weights: [
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
    biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    graphid: 26,
    nodeindex: 4,
    activationtype: "sigmoid",
    numoffilter: 32,
    padding: "valid",
    kernelsize_x: 5,
    kernelsize_y: 5,
    stride: 2,
    weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    biases: [0.05, 0.15],
  },

  {
    graphid: 27,
    nodeindex: 1,
    activationtype: "maxpool",
    numoffilter: 16,
    padding: "same",
    kernelsize_x: 3,
    kernelsize_y: 3,
    stride: 1,
    weights: [
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
    biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    graphid: 27,
    nodeindex: 4,
    activationtype: "sigmoid",
    numoffilter: 32,
    padding: "valid",
    kernelsize_x: 5,
    kernelsize_y: 5,
    stride: 2,
    weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    biases: [0.05, 0.15],
  },

  {
    graphid: 28,
    nodeindex: 1,
    activationtype: "maxpool",
    numoffilter: 16,
    padding: "same",
    kernelsize_x: 3,
    kernelsize_y: 3,
    stride: 1,
    weights: [
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
    biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    graphid: 28,
    nodeindex: 4,
    activationtype: "sigmoid",
    numoffilter: 32,
    padding: "valid",
    kernelsize_x: 5,
    kernelsize_y: 5,
    stride: 2,
    weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    biases: [0.05, 0.15],
  },

  {
    graphid: 29,
    nodeindex: 1,
    activationtype: "maxpool",
    numoffilter: 16,
    padding: "same",
    kernelsize_x: 3,
    kernelsize_y: 3,
    stride: 1,
    weights: [
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
    biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    graphid: 29,
    nodeindex: 4,
    activationtype: "sigmoid",
    numoffilter: 32,
    padding: "valid",
    kernelsize_x: 5,
    kernelsize_y: 5,
    stride: 2,
    weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    biases: [0.05, 0.15],
  },

  {
    graphid: 30,
    nodeindex: 1,
    activationtype: "maxpool",
    numoffilter: 16,
    padding: "same",
    kernelsize_x: 3,
    kernelsize_y: 3,
    stride: 1,
    weights: [
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
    biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    graphid: 30,
    nodeindex: 4,
    activationtype: "sigmoid",
    numoffilter: 32,
    padding: "valid",
    kernelsize_x: 5,
    kernelsize_y: 5,
    stride: 2,
    weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    biases: [0.05, 0.15],
  },

  {
    graphid: 31,
    nodeindex: 1,
    activationtype: "maxpool",
    numoffilter: 16,
    padding: "same",
    kernelsize_x: 3,
    kernelsize_y: 3,
    stride: 1,
    weights: [
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
    biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    graphid: 31,
    nodeindex: 4,
    activationtype: "sigmoid",
    numoffilter: 32,
    padding: "valid",
    kernelsize_x: 5,
    kernelsize_y: 5,
    stride: 2,
    weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    biases: [0.05, 0.15],
  },

  {
    graphid: 32,
    nodeindex: 1,
    activationtype: "maxpool",
    numoffilter: 16,
    padding: "same",
    kernelsize_x: 3,
    kernelsize_y: 3,
    stride: 1,
    weights: [
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
    biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    graphid: 32,
    nodeindex: 4,
    activationtype: "sigmoid",
    numoffilter: 32,
    padding: "valid",
    kernelsize_x: 5,
    kernelsize_y: 5,
    stride: 2,
    weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    biases: [0.05, 0.15],
  },

  {
    graphid: 52,
    nodeindex: 1,
    activationtype: "maxpool",
    numoffilter: 16,
    padding: "same",
    kernelsize_x: 3,
    kernelsize_y: 3,
    stride: 1,
    weights: [
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
    biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    graphid: 52,
    nodeindex: 4,
    activationtype: "sigmoid",
    numoffilter: 32,
    padding: "valid",
    kernelsize_x: 5,
    kernelsize_y: 5,
    stride: 2,
    weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    biases: [0.05, 0.15],
  },
];

const convolutionalLayers3 = [
  {
    graphid: 62,
    nodeindex: 1,
    activationtype: "maxpool",
    numoffilter: 16,
    padding: "same",
    kernelsize_x: 3,
    kernelsize_y: 3,
    stride: 1,
    weights: [
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
    biases: [0.2, 0.1, 0.5, 0.3],
  },
  {
    graphid: 62,
    nodeindex: 4,
    activationtype: "sigmoid",
    numoffilter: 32,
    padding: "valid",
    kernelsize_x: 5,
    kernelsize_y: 5,
    stride: 2,
    weights: [
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
      [
        [0.15, 0.25, 0.35],
        [0.45, 0.55, 0.65],
      ],
    ],
    biases: [0.05, 0.15],
  },
];

const insertConvolutionalLayers = async () => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN"); // Start transaction

    const queryText = `
      INSERT INTO "CONV_LAYER" 
      ("graphid", "nodeindex", "activationtype", "numoffilter", "padding", "kernelsize_x", "kernelsize_y", "stride", "weights", "biases")
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9::jsonb, $10)
    `;

    for (const layer of convolutionalLayers3) {
      const values = [
        layer.graphid,
        layer.nodeindex,
        layer.activationtype,
        layer.numoffilter,
        layer.padding,
        layer.kernelsize_x,
        layer.kernelsize_y,
        layer.stride,
        JSON.stringify(layer.weights), // Convert to JSONB
        layer.biases, // Already an array of numbers
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
