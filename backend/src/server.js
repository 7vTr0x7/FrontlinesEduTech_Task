import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { initializeDB } from "./db/db.connect.js";
import companyRouter from "./routes/company.js";

config();
const app = express();

app.use(express.json());

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api", companyRouter);

initializeDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
