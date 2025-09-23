import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function CompanyCard({ companies }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((c) => (
        <Card key={c._id} className="hover:shadow-md transition">
          <CardHeader>
            <CardTitle>{c.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {c.industry || "Industry not specified"}
            </p>
            <p className="text-sm">{c.location?.city ?? "-"}</p>
            <p className="text-sm">{c.employees ?? "-"}</p>
            <p className="text-sm">{c.foundedYear ?? "-"}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
