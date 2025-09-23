import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { initializeDB } from "./db/db.connect.js";
import companyRouter from "./routes/company.js";

config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const LOCAL_URL = process.env.LOCAL_URL;
const APP_URL = process.env.APP_URL;

const allowedOrigins = [LOCAL_URL, APP_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", companyRouter);

initializeDB();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
