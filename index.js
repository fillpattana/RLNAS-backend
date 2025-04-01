const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const { Pool } = require("pg");
const { Server } = require("ws");
//commit check
const app = express();
const port = 3000;

// CORS for all routes
app.use(cors());

// Configure db connection
const pool = new Pool({
  user: "Phil",
  host: "localhost",
  database: "rlnas_ver2",
  password: "1234",
  port: 5430,
});

module.exports = pool;

// JSON Parsing
app.use(express.json());

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Database connected!", time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed!" });
  }
});

// use route Graph.js
const graphRoutes = require("./routes/Graph");
app.use("/api/Graph", graphRoutes);

// use route IterationMetrics.js
const iterationMetricsRoute = require("./routes/IterationMetrics");
app.use("/api/IterationMetric", iterationMetricsRoute);

// use route OverviewAccMetrics.js
const OverviewAccMetricsRoute = require("./routes/OverviewAccMetrics");
app.use("/api/OverviewAccMetric", OverviewAccMetricsRoute);

// use route OverviewFlopMetrics.js
const OverviewFlopMetricsRoute = require("./routes/OverviewFlopMetrics");
app.use("/api/OverviewFlopMetric", OverviewFlopMetricsRoute);

// use route LossMetrics.js
const lossMetricsRoute = require("./routes/LossMetrics");
app.use("/api/LossMetric", lossMetricsRoute);

// use route AgentCount.js
const AgentCountRoute = require("./routes/AgentCount");
app.use("/api/AgentCount", AgentCountRoute);

// use route EpisodeCount.js
const EpisodeCountRoute = require("./routes/EpisodeCount");
app.use("/api/EpisodeCount", EpisodeCountRoute);

// use route IterationCount.js
const IterationCountRoute = require("./routes/IterationCount");
app.use("/api/IterationCount", IterationCountRoute);

// use route dagJSON.js
const dagJSONRoute = require("./routes/dagJSON");
app.use("/api/dagJSON", dagJSONRoute);

// WebSocket server initiate
const wss = new Server({ noServer: true });

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("(Client) New WebSocket connection established!");

  // Client Side Message
  ws.send(
    JSON.stringify({ message: "(Client) Connected to WebSocket server!" })
  );

  ws.on("close", () => {
    console.log("(Client) WebSocket connection closed.");
  });
});

// Listen for PostgreSQL notifications
// pool.connect((err, client) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }

//   console.log("Listening for PostgreSQL notifications...");
//   client.query("LISTEN table_update");

//   client.on("notification", (msg) => {
//     console.log("Notification received:", msg.payload);

//     // Broadcast the notification to all WebSocket clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === 1) {
//         client.send(msg.payload); // Send payload to WebSocket clients
//       }
//     });
//   });
// });

pool.connect((err, client) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  console.log("Listening for PostgreSQL notifications...");

  // Listen for the new finalized_update trigger
  client.query("LISTEN finalized_update");

  client.on("notification", (msg) => {
    console.log("Finalized update received:", msg.payload);

    // Broadcast the notification to all WebSocket clients
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(msg.payload); // Send payload to WebSocket clients
      }
    });
  });
});

// Server Upgrade to handle WebSocket connections
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
