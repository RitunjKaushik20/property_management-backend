const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin:[ "http://localhost:5173",
  "https://property_management.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/properties", require("./src/routes/property.routes"));
app.use("/api/leads", require("./src/routes/lead.routes"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;
