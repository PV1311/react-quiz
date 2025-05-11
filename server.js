const express = require("express");
const path = require("path");
const jsonServer = require("json-server");

const app = express();
const PORT = process.env.PORT || 9000;

// Serve static React files
app.use(express.static(path.join(__dirname, "build")));

// Use json-server as middleware
const router = jsonServer.router("data/questions.json");
const middlewares = jsonServer.defaults();
app.use("/api", middlewares, router);

// Handle SPA
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
