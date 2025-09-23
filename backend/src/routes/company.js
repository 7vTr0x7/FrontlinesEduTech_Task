import express from "express";
import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
} from "../controllers/company.js";

const router = express.Router();

router.get("/companies", getCompanies);
router.get("/companies/:id", getCompanyById);
router.post("/companies", createCompany);
router.put("/companies/:id", updateCompany);
router.delete("/companies/:id", deleteCompany);

export default router;
