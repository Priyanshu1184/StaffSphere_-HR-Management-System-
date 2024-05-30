import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../../style.css';
import axios from "axios";

const EmpDashboard = () => {
  const [employee, setEmployee] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get('/employee/detail/' + id)
      .then(result => {
        setEmployee(result.data.Result);
      })
      .catch(err => console.log(err));
  }, [id]);

  const handleLogout = () => {
    axios.get('/emp_Logout')
      .then((result) => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/'); // Redirect to the homepage or login page
        } else {
          console.log("Logout failed", result.data.Error);
        }
      }).catch(err => {
        console.log("An error occurred during logout", err);
      });
  };

  return (
    <div className="container-fluid p-0">
      <div className="row m-0">
        <div className="col-12 col-md-3 col-xl-2 px-sm-2 px-0 bg-dark fixed-top" style={{ height: '100vh' }}>
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to={`employee_detail/` + id}
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="pt-2 ms-2 fs-4 fw-bolder d-none d-sm-inline">
                StaffSphere
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to={`employee_detail/` + id}
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">EmpDashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={"LeaveReq/" + id}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Apply For Leave</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`employee_update/` + id}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Update Profile</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`EmpHisory/` + id}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-clock-history ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Employment History</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`EventSchedule/` + id}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-calendar-event ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Event</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to={`TrainingModules/` + id}
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-book ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Training Module</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  className="nav-link px-0 align-middle text-white"
                  onClick={handleLogout}
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0">
          <div className="p-2 card card-centered shadow align-items-center">
            <div className="d-flex justify-content-between align-items-center" style={{ marginLeft: "250px",position:"sticky" }}>
            <img
                src={`http://localhost:8000/images/${employee.image}`}
                alt="Employee"
                className="employee_image"
              />
              <h4 className="m-0">&nbsp;&nbsp;Welcome! {employee.name}</h4>
            </div>
          </div>
          <div style={{ marginLeft: '260px' }}>
            {/* Content */}
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;
