import { createContext,useContext,useState,useEffect } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }){
    const[token,setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if(savedToken)
        {
            setToken(savedToken);
        }

    },[]);
    const login = (newToken) =>{
        setToken(newToken);
        localStorage.setItem("token",newToken);
    };
    const logout = ()=>{
        setToken(null);
        localStorage.removeItem("token");
    }
    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);