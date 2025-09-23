import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const industries = ["All", "EdTech", "Finance", "Healthcare", "E-commerce"];
const cities = ["All", "Pune", "Mumbai", "Bengaluru", "Delhi"];

export default function FilterControls({ onChange, initial = {} }) {
  const [search, setSearch] = useState(initial.search || "");
  const [industry, setIndustry] = useState(initial.industry || "");
  const [city, setCity] = useState(initial.city || "");
  const [minEmployees, setMinEmployees] = useState(initial.minEmployees || "");
  const [maxEmployees, setMaxEmployees] = useState(initial.maxEmployees || "");
  const [sort, setSort] = useState(initial.sort || "-foundedYear");
  const [limit, setLimit] = useState(initial.limit || 5);

  useEffect(() => {
    const payload = {
      search: search.trim() || undefined,
      industry: industry && industry !== "All" ? industry : undefined,
      city: city && city !== "All" ? city : undefined,
      minEmployees: minEmployees !== "" ? Number(minEmployees) : undefined,
      maxEmployees: maxEmployees !== "" ? Number(maxEmployees) : undefined,
      sort,
      limit: Number(limit),
      page: 1,
    };
    onChange(payload);
  }, [search, industry, city, minEmployees, maxEmployees, sort, limit]);

  const reset = () => {
    setSearch("");
    setIndustry("");
    setCity("");
    setMinEmployees("");
    setMaxEmployees("");
    setSort("-foundedYear");
    setLimit(5);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm space-y-3">
      <div className="flex gap-3">
        <Input
          placeholder="Search companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          value={industry || "All"}
          onValueChange={(val) => setIndustry(val === "All" ? "" : val)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Industry" />
          </SelectTrigger>
          <SelectContent>
            {industries.map((i) => (
              <SelectItem key={i} value={i}>
                {i}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={city || "All"}
          onValueChange={(val) => setCity(val === "All" ? "" : val)}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex gap-3 items-center">
        <Input
          type="number"
          placeholder="Min employees"
          value={minEmployees}
          onChange={(e) => setMinEmployees(e.target.value)}
          className="w-[140px]"
        />
        <Input
          type="number"
          placeholder="Max employees"
          value={maxEmployees}
          onChange={(e) => setMaxEmployees(e.target.value)}
          className="w-[140px]"
        />

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="-foundedYear">Newest founded</SelectItem>
            <SelectItem value="foundedYear">Oldest founded</SelectItem>
            <SelectItem value="-employees">Most employees</SelectItem>
            <SelectItem value="employees">Least employees</SelectItem>
            <SelectItem value="name">Name A → Z</SelectItem>
            <SelectItem value="-name">Name Z → A</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" onClick={reset}>
          Reset
        </Button>
      </div>
    </div>
  );
}
