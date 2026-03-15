import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }){
    const { token } = useAuth();
    const navigate = useNavigate();
    if(!token) navigate("/");
    return children;
}