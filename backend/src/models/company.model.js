import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    industry: String,
    location: {
      city: String,
      state: String,
      country: String,
    },
    employees: Number,
    foundedYear: Number,
    description: String,
  },
  { timestamps: true }
);
CompanySchema.index({ name: "text", description: "text", industry: "text" });

export const Company = mongoose.model("Company", CompanySchema);
