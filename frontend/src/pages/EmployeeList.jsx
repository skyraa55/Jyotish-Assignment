import axios from "axios";
import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../svgs/Icon";
import User from "../svgs/User";

export default function EmployeeList() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [scrollTop, setScrollTop] = useState(0);
    const containerHeight = 550;
    const rowHeight = 60;
    const buffer = 5;
    const totalEmployees = employees.length;
    useEffect(() => {
        const cachedEmployeee = localStorage.getItem("employees");
        if (cachedEmployeee) {
            setEmployees(JSON.parse(cachedEmployeee));
        }
        else {
            fetchEmployees();
        }

    }, []);
    const cityCounts = employees.reduce((acc, emp) => {
        const city = emp[2];
        if (!acc[city]) {
            acc[city] = 0;
        }
        acc[city]++;
        return acc;
    }, {});
    const fetchEmployees = async () => {
        const res = await axios.post("https://backend.jotish.in/backend_dev/gettabledata.php", {
            username: "test",
            password: "123456",
        });
        console.log(res.data);
        const data = res.data?.TABLE_DATA?.data || [];
        setEmployees(data);
        localStorage.setItem("employees", JSON.stringify(data));
    }
    const visibleRows = Math.ceil(containerHeight / rowHeight);
    const startIndex = Math.floor(scrollTop / rowHeight);
    const endIndex = startIndex + visibleRows + buffer;
    const visibleData = (employees || []).slice(startIndex, endIndex);
    const totalHeight = employees.length * rowHeight;
    const offsetY = startIndex * rowHeight;
    return (
        <div className="h-screen w-full bg-white overflow-hidden ">
            <div className="h-20 bg-[#271F5D] rounded-b-lg text-white text-3xl font-semibold flex items-center p-6 pl-12 pr-12">
                <div className="flex justify-between items-center w-full">
                    <div className="flex gap-4  items-center">
                        <Icon />
                        <div>Employee List</div>
                    </div>
                    <User />

                </div>

            </div>
            <div className="w-full px-92 py-8 grid grid-cols-4 gap-6">
                <div className="bg-[#F4F4F5] border border-[#DBDBDC] shadow-xl rounded-xl pt-4 pb-4 flex flex-col items-center gap-3 text-[#252437]">
                    <div className="flex items-center gap-2">
                        <p className="text-[#252437] text-xl font-semibold">Total Employees</p>
                    </div>
                    <h2 className="text-2xl text-[#252437] font-semibold">{totalEmployees}</h2>
                </div>

                <div className="bg-[#F4F4F5] border border-[#DBDBDC] shadow-xl rounded-xl pt-4 pb-4 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-2">
                        <p className="text-[#252437] text-xl font-semibold">Edinburgh</p>
                    </div>
                    <h2 className="text-2xl text-[#252437] font-semibold">{cityCounts["Edinburgh"] || 0}</h2>
                </div>
                <div className="bg-[#F4F4F5] border border-[#DBDBDC] shadow-xl rounded-xl pt-4 pb-4 flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <p className="text-[#252437] text-xl font-semibold">Tokyo</p>
                    </div>
                    <h2 className="text-2xl text-[#252437] font-semibold">{cityCounts["Tokyo"] || 0}</h2>
                </div>
                <div className="bg-[#F4F4F5] border border-[#DBDBDC] shadow-xl rounded-xl pt-4 pb-4  flex flex-col items-center gap-2">
                    <div className="flex items-center gap-2">
                        <p className="text-[#252437] text-xl font-semibold">San Francisco</p>
                    </div>
                    <h2 className="text-2xl text-[#252437] font-semibold">{cityCounts["San Francisco"] || 0}</h2>
                </div>
            </div>
            <div className="w-full px-100 py-8 grid grid-cols-3 gap-6 pl-120 -translate-y-10" >
                <div className="bg-[#F4F4F5] border border-[#DBDBDC] shadow-xl rounded-xl pt-4 pb-4  flex flex-col items-center gap-2 w-70 h-28">
                    <div className="flex items-center gap-2">
                        <p className="text-[#252437] text-xl font-semibold">New York</p>
                    </div>
                    <h2 className="text-2xl text-[#252437] font-semibold">{cityCounts["New York"] || 0}</h2>
                </div>
                <div className="bg-[#F4F4F5] border border-[#DBDBDC] shadow-xl rounded-xl pt-4 pb-4  flex flex-col items-center gap-2  w-70 h-28">
                    <div className="flex items-center gap-2">
                        <p className="text-[#252437] text-xl font-semibold">London</p>
                    </div>
                    <h2 className="text-2xl text-[#252437] font-semibold">{cityCounts["London"] || 0}</h2>
                </div>
                <div className="bg-[#F4F4F5] border border-[#DBDBDC] shadow-xl rounded-xl pt-4 pb-4  flex flex-col items-center gap-2  w-70 h-28">
                    <div className="flex items-center gap-2">
                        <p className="text-[#252437] text-xl font-semibold">Singapore</p>
                    </div>
                    <h2 className="text-2xl text-[#252437] font-semibold">{cityCounts["Singapore"] || 0}</h2>
                </div>

            </div>
            <div className=" pl-8 pr-8">
                <div
                    style={{
                        display: "flex",
                        padding: "16px",
                        fontWeight: "bold",
                        border: "2px solid #ccc",
                        height: rowHeight,
                        alignItems: "center",
                        borderRadius:"10px",
                        color:"black"
                       
                    }}
                >
                    <div style={{ width: "80px",fontSize:"20px" }}>S.No</div>
                    <div style={{ flex: 1,fontSize:"20px" }}>Name</div>
                    <div style={{ flex: 1,fontSize:"20px" }}>Position</div>
                    <div style={{ flex: 1,fontSize:"20px" }}>City</div>
                    <div style={{ flex: 1 ,fontSize:"20px"}}>Extn.</div>
                    <div style={{ flex: 1 ,fontSize:"20px"}}>Start Date</div>
                    <div style={{ flex: 1 ,fontSize:"20px"}}>Salary</div>
                </div>
                <div style={{
                    height: containerHeight,
                    overflowY: "auto",
                    border: "1px solid #ccc",
                    borderRadius: "10px"

                }}
                    className="bg-white"
                    onScroll={(e) => setScrollTop(e.target.scrollTop)}
                >
                    <div
                        style={{
                            height: totalHeight,
                            position: "relative"
                        }}
                    >
                        <div
                            style={{
                                transform: `translateY(${offsetY}px)`
                            }}>
                            {visibleData.map((emp, index) => {
                                return (
                                    <div key={startIndex + index}
                                        onClick={() => navigate(`/details/${startIndex + index}`)}
                                        style={{
                                            height: rowHeight,
                                            borderBottom: "1px solid #eee",
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "0 16px"
                                        }}
                                    >
                                        <div style={{ width: "80px" }}>{startIndex + index + 1}</div>
                                        <div style={{ flex: 1, fontSize: "18px" }}>{emp[0]}</div>
                                        <div style={{ flex: 1, fontSize: "18px" }}>{emp[1]}</div>
                                        <div style={{ flex: 1, fontSize: "18px" }}>{emp[2]}</div>
                                        <div style={{ flex: 1, fontSize: "18px" }}>{emp[3]}</div>
                                        <div style={{ flex: 1, fontSize: "18px" }}>{emp[4]}</div>
                                        <div style={{ flex: 1, fontSize: "18px" }}>{emp[5]}</div>

                                    </div>
                                )


                            })}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}