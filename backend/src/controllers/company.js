import { Company } from "../models/company.model.js";

export const getCompanies = async (req, res) => {
  try {
    const {
      search,
      industry,
      city,
      minEmployees,
      maxEmployees,
      foundedAfter,
      foundedBefore,
      page = 1,
      limit = 5,
      sort,
    } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { industry: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { "location.city": { $regex: search, $options: "i" } },
      ];
    }

    if (industry) filter.industry = industry;
    if (city) filter["location.city"] = city;

    if (minEmployees || maxEmployees) {
      filter.employees = {};
      if (minEmployees) filter.employees.$gte = Number(minEmployees);
      if (maxEmployees) filter.employees.$lte = Number(maxEmployees);
    }

    if (foundedAfter || foundedBefore) {
      filter.foundedYear = {};
      if (foundedAfter) filter.foundedYear.$gte = Number(foundedAfter);
      if (foundedBefore) filter.foundedYear.$lte = Number(foundedBefore);
    }

    const skip = (Number(page) - 1) * Number(limit);
    let query = Company.find(filter).skip(skip).limit(Number(limit));

    if (sort) {
      query = query.sort(sort);
    }

    const data = await query;
    const total = await Company.countDocuments(filter);
    const pages = Math.ceil(total / limit);

    res.json({ data, page: Number(page), limit: Number(limit), total, pages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    const savedCompany = await company.save();
    res.status(201).json(savedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCompany)
      return res.status(404).json({ message: "Company not found" });
    res.json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany)
      return res.status(404).json({ message: "Company not found" });
    res.json({ message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
