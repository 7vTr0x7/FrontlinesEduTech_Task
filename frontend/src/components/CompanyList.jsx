import React, { useEffect, useState } from "react";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCompanies = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/companies`, {
        credentials: "include",
      });
      if (!res.ok) {
        console.log("Failed while fetching companies");
      }

      const data = await res.json();
      if (data?.data) {
        setCompanies(data.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Failed to fetch companies");
      setIsLoading(false);
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <div>
      <p>List</p>
      {companies?.length > 0 ? (
        <div>
          {companies.map((company) => (
            <div key={company._id}>
              <p className="text-xl text-black">{company.name}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>{isLoading ? <p>Loading</p> : <p>No data found</p>}</div>
      )}
    </div>
  );
};

export default CompanyList;
