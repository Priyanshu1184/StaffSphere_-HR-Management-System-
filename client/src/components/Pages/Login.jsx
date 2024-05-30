import { useState, useContext } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../../UserContext'; // Import UserContext
import "./login.css";
import bg from "../../assets/bg2.png";

function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const { setUserId } = useContext(UserContext); // Use context to set the user ID

    axios.defaults.withCredentials = true;

    async function logUser(e) {
        e.preventDefault();
        const { email, password } = data;
        try {
            const result = await axios.post("/login", { email, password });
            if (result.data.Status) {
                console.log(result.data);
                localStorage.setItem("valid", true);
                toast.success(`Login Successful. Welcome!`);
                const id = result.data.id;
                setUserId(id); // Set the ID in context
                navigate(`/dashboard`);
            } else {
                toast.error("Failed To Login");
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="bg">
            <div className="cont" id="container">
                <div className="form-container sign-in-container">
                    <form onSubmit={logUser}>
                        <h2 className="h1">Sign in</h2>
                        <input
                            className="input"
                            type="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                        />
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                        />
                        <button type="submit" className="btnSign">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
