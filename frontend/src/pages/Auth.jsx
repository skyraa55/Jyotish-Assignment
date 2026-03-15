import { React, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth() {
    const [isSignup, setIsSignup] = useState(false);
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 overflow-hidden">
            <div className="relative flex w-[1100px] h-[600px] bg-white rounded-2xl overflow-hidden shadow-xl">
                <div className={`absolute top-0 h-full w-[60%] transition-all duration-700 ease-in-out z-10 ${isSignup ? "left-[40%]" : "left-0"}`}>
                    <video className="w-full h-full object-cover" autoPlay muted loop>
                        <source src="/adminV.mp4" type="video/mp4" />
                    </video>
                </div>
                <div className={`absolute top-0 h-full w-[40%] transition-all duration-700 eace-in-out z-20 ${isSignup ? "right-[100% opacity-0 pointer-events-none" : "right-0 opacity-100"}`}>
                    <Login onSwitchToSignup={() => setIsSignup(true)} />

                </div>

                <div className={`absolute top-0 h-full w-[40%] transition-all duration-700 eace-in-out z-20 ${isSignup ? "left-0 opacity-100" : "-left-full opacity-0 pointer-events-none"}`}>
                    <Signup onSwitchToLogin={() => setIsSignup(false)} />

                </div>

            </div>

        </div>

    )
}