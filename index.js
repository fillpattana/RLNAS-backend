const express = require("express");
const cors = require("cors"); // Import the CORS middleware
const { Pool } = require("pg");
const { Server } = require("ws");

const app = express();
const port = 3000;

// CORS for all routes
app.use(cors());

// Configure db connection
const pool = new Pool({
  user: "Phil",
  host: "localhost",
  database: "rlnas_ver3",
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

const insertNewSessionRoutes = require("./routes/InsertNewSession");
app.use("/api/newsession", insertNewSessionRoutes);

// use route ActiveSessions.js
const activeSessionsRoute = require("./routes/ActiveSessions");
app.use("/api/activesessions", activeSessionsRoute);

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

////////////////////////////////MULTIPLE SUBSCRIPTION WEBSOCKETS////////////////////////////////

const subscribedClients = new Map(); // Map<ws, Set<channel>>

wss.on("connection", (ws) => {
  console.log("New WebSocket connection!");

  // Each client can subscribe to multiple channels
  subscribedClients.set(ws, new Set());

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message);
      if (data.type === "subscribe" && data.channel) {
        subscribedClients.get(ws).add(data.channel); // Add new channel to client's subscriptions
        console.log(`Client subscribed to channel: ${data.channel}`);
      }
    } catch (err) {
      console.error("WebSocket message parsing error:", err);
    }
  });

  ws.on("close", () => {
    subscribedClients.delete(ws); // Clean up on disconnect
    console.log("WebSocket client disconnected");
  });
});

// PostgreSQL LISTEN setup
pool.connect((err, client) => {
  if (err) {
    console.error("DB connection error:", err);
    return;
  }

  client.query("LISTEN new_iterationmetrics");
  client.query("LISTEN new_lossmetrics");
  client.query("LISTEN finalized_update");
  client.query("LISTEN sessions_change");

  console.log("Listening for PostgreSQL notifications...");

  client.on("notification", (msg) => {
    console.log("Postgres NOTIFY:", msg.channel, msg.payload);

    subscribedClients.forEach((channels, ws) => {
      if (channels.has(msg.channel) && ws.readyState === 1) {
        ws.send(msg.payload);
      }
    });
  });
});

////////////////////////////////SINGLE SUBSCRIPTION WEBSOCKETS////////////////////////////////

// Handle WebSocket connections
// wss.on("connection", (ws) => {
//   console.log("(Client) New WebSocket connection established!");

//   // Client Side Message
//   ws.send(
//     JSON.stringify({ message: "(Client) Connected to WebSocket server!" })
//   );

//   ws.on("close", () => {
//     console.log("(Client) WebSocket connection closed.");
//   });
// });

// pool.connect((err, client) => {
//   if (err) {
//     console.error("Error connecting to the database:", err);
//     return;
//   }

//   console.log("Listening for PostgreSQL notifications...");

//   // Listen for the new finalized_update trigger
//   client.query("LISTEN finalized_update");

//   client.on("notification", (msg) => {
//     console.log("Finalized update received:", msg.payload);

//     // Broadcast the notification to all WebSocket clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === 1) {
//         client.send(msg.payload); // Send payload to WebSocket clients
//       }
//     });
//   });
// });

// Server Upgrade to handle WebSocket connections
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});
