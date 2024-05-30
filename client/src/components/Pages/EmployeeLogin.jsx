import React, { useState } from 'react'
import '../../style.css'
import axios from 'axios'
import { toast } from "react-hot-toast";
import { useNavigate } from 'react-router-dom'
import "./login.css";
import bg from "../../assets/bg2.png";
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import 'bootstrap-icons/font/bootstrap-icons.css';  // Import Bootstrap Icons CSS

const EmployeeLogin = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('/employee/employee_login', values)
            .then(result => {
                if (result.data.Status) {
                    localStorage.setItem("valid", true);
                    toast.success("Login Successful. Welcome!");
                    navigate("/EmpDashboard/employee_detail/"+result.data.id)
                } else {
                    toast.error(result.data.error)
                    setError(result.data.error)
                }
            })
            .catch(err => toast.error(err))
    }

    return (
        <div className='bg'>
        <div className="cont" id="container">
            <div className="form-container sign-in-container">
                <form onSubmit={handleSubmit}>
                    <h1 className="h1">Sign in</h1>
                    <input
                        className="input form-control"
                        type="email"
                        placeholder="Email"
                        name="email"
                        autoComplete='off'
                        onChange={(e) => setValues({ ...values, email: e.target.value })}
                    />
                    <input
                        className="input form-control"
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                    />

                    <button type="submit" className="btnSign">Sign In</button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default EmployeeLogin