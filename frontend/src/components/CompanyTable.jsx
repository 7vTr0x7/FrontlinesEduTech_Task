import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function CompanyTable({ companies }) {
  return (
    <Card className="w-full">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Industry</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Employees</th>
                <th className="px-4 py-2">Founded</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr
                  key={c._id}
                  className="border-b last:border-0 hover:bg-muted/10">
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3">{c.industry || "-"}</td>
                  <td className="px-4 py-3">
                    {c.location?.city ? `${c.location.city}` : "-"}
                  </td>
                  <td className="px-4 py-3">{c.employees ?? "-"}</td>
                  <td className="px-4 py-3">{c.foundedYear ?? "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
