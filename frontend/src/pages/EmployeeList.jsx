import axios from "axios";
import { React,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function EmployeeList(){
    const navigate = useNavigate();
    const [employees,setEmployees] = useState([]);
    const [scrollTop,setScrollTop] = useState(0);
    const containerHeight = 600;
    const rowHeight = 50;
    const buffer = 5;
    useEffect(()=>{
        fetchEmployees();
    },[]);
    const fetchEmployees = async ()=>{
        const res = await axios.post("https://backend.jotish.in/backend_dev/gettabledata.php",{
            username: "test",
            password: "123456",
        });
         console.log(res.data);
        setEmployees(res.data?.TABLE_DATA?.data || []);
       

    }
    const visibleRows = Math.ceil(containerHeight/rowHeight);
    const startIndex = Math.floor(scrollTop/rowHeight);
    const endIndex = startIndex + visibleRows + buffer;
    const visibleData = (employees || []).slice(startIndex,endIndex);
    const totalHeight = employees.length*rowHeight;
    const offsetY = startIndex*rowHeight;
    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Employee List </h1>
            <div style={{
                height:containerHeight,
                overflowY:"auto",
                border:"1px solid #ccc"
            }}
            onScroll={(e) => setScrollTop(e.target.scrollTop)}
            >
                <div
                 style={{
                    height:totalHeight,
                    position:"relative"
                 }}
                >
                    <div
                      style={{
                        transform:`translateY(${offsetY}px)`
                      }}>
                        {visibleData.map((emp,index) => {
                            return (
                                <div key={startIndex+index}
                                    onClick={() => navigate(`/details/${startIndex+index}`)}
                                    style={{
                                        height:rowHeight,
                                        borderBottom:"1px solid #eee",
                                        display:"flex",
                                        alignItems:"center",
                                        padding:"0 16px"
                                    }}
                                >
                                    <div style={{width:"80px"}}>{startIndex+index+1}</div>
                                    <div style={{ flex:1}}>{emp[0]}</div>
                                    <div style={{ flex:1}}>{emp[1]}</div>
                                    <div style={{ flex:1}}>{emp[2]}</div>
                                    <div style={{ flex:1}}>{emp[3]}</div>
                                    <div style={{ flex:1}}>{emp[4]}</div>
                                    <div style={{ flex:1}}>{emp[5]}</div>
                                    
                                </div>
                            )


                        })}

                    </div>

                </div>

            </div>

        </div>
    )
}