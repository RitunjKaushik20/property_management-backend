const express = require("express");
const cors = require("cors");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://property-management-backend-six.vercel.app",
  "https://property-management-backend-nwwyuygia-ritunj-kaushiks-projects.vercel.app"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    console.log("❌ CORS blocked:", origin);
    callback(new Error("CORS blocked"));
  },
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./src/routes/auth.routes"));
app.use("/api/properties", require("./src/routes/property.routes"));
app.use("/api/leads", require("./src/routes/lead.routes"));

app.get("/", (req, res) => {
  res.send("Property Management API Running");
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ message: err.message || "Server error" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
