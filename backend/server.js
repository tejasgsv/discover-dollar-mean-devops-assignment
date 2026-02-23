const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS for Angular (4200) → Node backend (8080)
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Parse URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Root test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

// API routes
require("./app/routes/turorial.routes")(app);

// Server port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});