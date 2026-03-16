import React from "react";
import SalaryChart from "../components/SalaryChart";
import CityMap from "../components/CityMap";
import { useParams } from "react-router-dom";
import Curve from "../svgs/Curve";

export default function Analytics() {
    const { id } = useParams();
    let employees = [];
    try {
        employees = JSON.parse(localStorage.getItem("employees")) || [];
    } catch {
        employees = [];
    }
    const mergedImage = localStorage.getItem("mergedImage");
    let employee = employees[id];
    console.log(employee);

    return (
        <div className="h-screen w-screen flex">
            <div className="w-3/5 p-8 bg-gray-100">
                <div className="bg-white rounded-xl w-full shadow-xl flex gap-2 p-4">
                    <img
                        src={mergedImage}
                        alt="Merged"
                        className="w-70 h-80 border rounded-lg"
                    />
                    <div className="p-8">
                        <div className="space-y-4">
                            {[
                                ["Name", employee[0]],
                                ["Position", employee[1]],
                                ["City", employee[2]],
                                ["Extn", employee[3]],
                                ["Start date", employee[4]],
                                ["Salary", employee[5]],
                            ].map(([label, value]) => (
                                <div key={label} className="flex text-xl">
                                    <span className="font-semibold w-32">{label}</span>
                                    <span className="font-semibold w-8">:</span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-center items-center bg-white rounded-lg shadow-2xl p-18">
                    <SalaryChart />
                </div>
            </div>
            <div className="w-2/5 bg-gray-100 pt-8 p-2 pb-1 pr-3 rounded-xl">
            <CityMap employees={employees} />
            <div className=" mt-4 rounded-2xl bg-[#271F5D] p-20 gap-2">
            
                    <div className="text-4xl font-semibold text-white mb-6">Employee Dashboard</div>

                
                
                <Curve />

            </div>
            </div>
            
        </div>

    );

}