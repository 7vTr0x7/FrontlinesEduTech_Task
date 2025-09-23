import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { initializeDB } from "./db/db.connect.js";

config();
const app = express();

app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

initializeDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
