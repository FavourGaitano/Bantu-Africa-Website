import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import roomRouter from "./src/routes/roomRoute.js";
import userRouter from "./src/routes/userRoute.js";
import restaurantRouter from "./src/routes/restaurantRoute.js";
import bookingsRouter from "./src/routes/bookingsRouter.js";
import inquiriesRouter from "./src/routes/inquiriesRouter.js";
import serviceRouter from "./src/routes/serviceRoute.js";
import activityRouter from "./src/routes/activityRoute.js";
import roomCategoryRouter from "./src/routes/roomCategoryRoute.js";
import offerRouter from "./src/routes/offerRoutes.js";
import notificationRouter from "./src/routes/notificationRoute.js";
import galleryRouter from "./src/routes/galleryRoute.js";
import meetingRouter from "./src/routes/meetingRoute.js";
import meetingpackageRouter from "./src/routes/meetingPackageroute.js";
import upCommingEventRouter from "./src/routes/upcommingEventRoute.js";

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
app.use("/api", userRouter);
app.use("/api", restaurantRouter);``
app.use("/api", bookingsRouter);
app.use("/api", inquiriesRouter);
app.use("/api", serviceRouter);
app.use("/api", activityRouter);
app.use("/api/category", roomCategoryRouter);
app.use("/api", offerRouter);
app.use("/api", notificationRouter);
app.use("/api", galleryRouter);
app.use("/api", meetingRouter);
app.use("/api", meetingpackageRouter);
app.use("/api", upCommingEventRouter);

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT} `);
});
