import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './start.css'
import AdminLogin from './Pages/Login'
import EmployeeLogin from './Pages/EmployeeLogin'
const Start = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:8000/verify')
    .then(result => {
      if(result.data.Status) {
        if(result.data.role === "admin") {
          navigate('/dashboard');
        } else {
          navigate('/EmpDashboard/employee_detail/'+result.data.id);
        }
      }
    })
    .catch(err => console.log(err));
  }, []);

  const [isAdmin, setIsAdmin] = useState(true);


  return (
    <div>
      <div className="d-flex justify-content-center align-items-center vh-100 loginPage " style={{backgroundImage: "linear-gradient(to top, #dfe9f3 0%, white 100%)"}}>
        <div className="rounded  w-65 border loginForm h-50" style={{marginTop:"-10%" , background:"#fff"}}>
          <div className="d-flex justify-content-between  ">
          <button type="button" className={`btnSign ${!isAdmin ? 'active' : ''} btn mx-2`} onClick={() => setIsAdmin(false)}>
            Employee
          </button>
          <hr></hr>
          <button type="button" className={`btnSign ${isAdmin ? 'active' : ''} btn mx-2`} onClick={() => setIsAdmin(true)}>
            Admin
            </button>
          </div>
          <div className="login-container">
          <div className="loginform">
            {isAdmin ? <AdminLogin /> : <EmployeeLogin />}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Start;
