import React, { useState, useEffect, useCallback, Suspense } from "react";
import FilterControls from "@/components/FilterControls";
import { buildQuery } from "@/utils/buildQuery";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const CompanyTable = React.lazy(() => import("@/components/CompanyTable"));
const CompanyCard = React.lazy(() => import("@/components/CompanyCard"));

export default function CompaniesPage() {
  const [filters, setFilters] = useState({
    search: "",
    industry: "",
    city: "",
    minEmployees: undefined,
    maxEmployees: undefined,
    sort: "-foundedYear",
    limit: 5,
    page: 1,
  });

  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState("table");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      fetchCompanies(filters);
    }, 450);

    return () => clearTimeout(t);
  }, [
    filters.search,
    filters.industry,
    filters.city,
    filters.minEmployees,
    filters.maxEmployees,
    filters.sort,
    filters.limit,
    filters.page,
  ]);

  const fetchCompanies = useCallback(async (currentFilters) => {
    setIsLoading(true);
    setError(null);

    try {
      const query = buildQuery(currentFilters);
      const url = `${import.meta.env.VITE_API_URL}/api/companies?${query}`;

      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to fetch");
      }

      const json = await res.json();
      setCompanies(json.data || []);
      setTotalPages(json.pages || 1);
    } catch (err) {
      setCompanies([]);
      setError(err.message || "Error fetching companies");
    } finally {
      setIsLoading(false);
    }
  }, []);

  function handleFilterChange(newFilters) {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: newFilters.page ?? 1,
    }));
  }

  function goToPage(next) {
    setFilters((p) => ({ ...p, page: next }));
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Companies</h1>
        <div className="flex gap-2">
          <Button
            variant={view === "table" ? "default" : "ghost"}
            onClick={() => setView("table")}>
            Table
          </Button>
          <Button
            variant={view === "card" ? "default" : "ghost"}
            onClick={() => setView("card")}>
            Cards
          </Button>
        </div>
      </div>

      <FilterControls onChange={handleFilterChange} initial={filters} />

      {/* {error && <div className="text-sm text-red-600">{error}</div>} */}

      <div>
        <Suspense
          fallback={
            <div className="grid gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          }>
          {isLoading ? (
            <div className="grid gap-4">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-40 w-full" />
            </div>
          ) : companies.length > 0 ? (
            view === "table" ? (
              <CompanyTable companies={companies} />
            ) : (
              <CompanyCard companies={companies} />
            )
          ) : (
            <div className="p-4 text-muted-foreground">
              No companies found for these filters.
            </div>
          )}
        </Suspense>
      </div>

      <div className="flex items-center justify-between">
        <div>
          Page {filters.page} / {totalPages}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => goToPage(Math.max(1, filters.page - 1))}
            disabled={filters.page <= 1}>
            Prev
          </Button>
          <Button
            onClick={() => goToPage(Math.min(totalPages, filters.page + 1))}
            disabled={filters.page >= totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
