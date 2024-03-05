const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
app.use(express.json());
const dbConfig = require("./config/dbConfig.js");
const cors = require("cors");

const usersRoute = require("./routes/usersRoute.js");
const examsRoute = require("./routes/examRoute.js");
const reportsRoute = require("./routes/reportsRoute.js");

// Use Morgan middleware with the "dev" format
app.use(morgan("dev"));

app.use(
  cors({
    origin: [
      "https://quiz-portal-mern-client.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hi From Backend");
});

app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
