import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const BASE_URL = "http://localhost:3000";

export default function Login({ onSwitchToSignup }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const handleLogin = async () => {
        if (!username || !password) {
            setError("All fields are required");
            return;
        }
        try {
            setLoading(true);
            setError("");
            const res = await axios.post(`${BASE_URL}/login`, {
                username,
                password,
            });
            login(res.data.token);
            navigate("/employeelist");

        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="w-full h-full p-8 flex flex-col justify-center bg-white">
            <div className="flex justify-center mb-4">
                <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center">
                    <img src="/men.png" alt="user" className="w-12 h-12 object-cover" />

                </div>

            </div>
            <h1 className="text-3xl text-center font-semibold mb-4">Welcome Back</h1>
            <p className="text-center text-gray-600 text-lg font-medium mb-4">Login to continue</p>
            <input type="text" placeholder="Enter username" className="w-full border border-gray-400 rounded-lg px-4  py-2 mb-4 text-base focus:outline-none focus:border-gray-600" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Enter password" className="w-full border border-gray-400 rounded-lg px-4 py-2 mb-4 text-base focus:outline-none focus:border-gray-600" value={password} onChange={(e) => setPassword(e.target.value)}/>
            {error && (
                <p className="text-red-500 text-center mb-2">{error} </p>
            )}
            <button onClick={handleLogin} disabled={loading} className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl text-lg font-medium transition">
                {loading ? "Loading..." : "Login"}

            </button>
            <p className="text-center mt-4 text-lg">
                Don't have an account?
                <button onClick={onSwitchToSignup} className="text-blue-500 ml-2 font-medium">
                    Signup

                </button>

            </p>


        </div>

    )

}
