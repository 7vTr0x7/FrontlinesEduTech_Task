import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { initializeDB } from "./db/db.connect.js";
import companyRouter from "./routes/company.js";

config();
const app = express();

app.use(express.json());

const PORT = process.env.PORT;
const API_URL = process.env.API_URL;

const corsOptions = {
  origin: [`http://localhost:${PORT}`, API_URL],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", companyRouter);

initializeDB();

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
