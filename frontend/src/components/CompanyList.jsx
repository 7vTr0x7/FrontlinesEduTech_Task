import React, { useEffect, useState } from "react";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);

  const fetchCompanies = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}`, {
        credentials: "include",
      });
      if (!res.ok) {
        console.log("Failed while fetching companies");
      }

      const data = await res.json();
      if (data?.data) {
        setCompanies(data.data);
      }
    } catch (error) {
      console.log("Failed to fetch companies");
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  console.log(companies);

  return (
    <div>
      {companies.length > 0 ? (
        <div>
          {companies.map((company) => {
            <div key={company._id}>
              <p>{company.name}</p>
            </div>;
          })}
        </div>
      ) : (
        <div>
          <p>No data found</p>
        </div>
      )}
    </div>
  );
};

export default CompanyList;
