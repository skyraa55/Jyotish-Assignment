import React from "react";
import SalaryChart from "../components/SalaryChart";
import CityMap from "../components/CityMap";

export default function Analytics() {
    let employees = [];
    try {
        employees = JSON.parse(localStorage.getItem("employees")) || [];
    } catch {
        employees = [];
    }
     const mergedImage = localStorage.getItem("mergedImage");
  return (
    <div className="p-8 space-y-10">
      <div>
        <h2 className="text-xl font-semibold mb-4">
          Final Merged Image
        </h2>
        <img
          src={mergedImage}
          alt="Merged"
          className="w-64 border"
        />
      </div>
      <SalaryChart />
      <CityMap employees={employees} />
    </div>

  );

}