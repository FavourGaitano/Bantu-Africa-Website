import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import bookingsRouter from "./src/routes/bookingsRouter.js";
import inquiriesRouter from "./src/routes/inquiriesRouter.js";
import roomRouter from "./src/routes/roomRoute.js";
import serviceRouter from "./src/routes/serviceRoute.js";
import activityRouter from "./src/routes/activityRoute.js";
import roomCategoryRouter from "./src/routes/roomCategoryRoute.js";

dotenv.config();
const PORT = process.env.API_PORT || 3000;

const app = express();
var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get("/health", (req, res) => {
  res.status(200).send("I am very healthy💪");
});

//routes
app.use("/api", roomRouter);
app.use("/api", bookingsRouter);
app.use("/api", inquiriesRouter);
app.use("/api", serviceRouter);
app.use("/api", activityRouter);
app.use("/api", roomCategoryRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT} `);
});
