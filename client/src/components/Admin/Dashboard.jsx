import React, { useContext, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import '../../style.css';
import axios from "axios";
import { UserContext } from '../../UserContext'; // Import UserContext

const Dashboard = () => {
    const navigate = useNavigate();
    const { userId, setUserId } = useContext(UserContext); // Use context for user ID


    const handleLogout = () => {
        axios.get('/logout')
            .then(result => {
                if (result.data.Status) {
                    localStorage.removeItem("valid");
                    sessionStorage.removeItem("userId");
                    setUserId(null);
                    navigate('/');
                }
            });
    };

    return (
        <div className="container-fluid p-0">
            <div className="row m-0">
                <div className="col-4 col-md-3 col-xl-2 px-sm-2 px-0 bg-dark fixed-top" style={{ height: '100vh' }}>
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <Link
                            to="/dashboard"
                            className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
                        >
                            <span className="ms-2 fs-5 fw-bolder d-none d-sm-inline">StaffSphere</span>
                        </Link>
                        <ul
                            className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
                            id="menu"
                        >
                            <li className="nav-item w-100 mb-2">
                                <Link
                                    to="/dashboard"
                                    className="nav-link text-white px-0 align-middle"
                                >
                                    <i className="fs-4 bi-speedometer2 ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                                </Link>
                            </li>
                            <li className="nav-item w-100 mb-2">
                                <Link
                                    to="/dashboard/employee"
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-people ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Manage Employees</span>
                                </Link>
                            </li>
                            <li className="nav-item w-100 mb-2">
                                <Link
                                    to="/dashboard/leave_request"
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-columns ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Leave Request's</span>
                                </Link>
                            </li>
                            <li className="nav-item w-100 mb-2">
                                <Link
                                    to={`/dashboard/payroll/`}
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-credit-card ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Payroll</span>
                                </Link>
                            </li>
                            <li className="nav-item w-100 mb-2">
                                <Link
                                    to='/dashboard/EventScheduler'
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-calendar-event ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Event Schedule</span>
                                </Link>
                            </li>
                            <li className="nav-item w-100 mb-2">
                                <Link
                                    to={`/dashboard/empenroll`}
                                    className="nav-link px-0 align-middle text-white"
                                >
                                    <i className="fs-4 bi-book ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Employee Onboarding</span>
                                </Link>
                            </li>
                            <li className="nav-item w-100 mb-2">
                                <Link
                                    to={`/dashboard/editAdmin/${userId}`}
                                    className="nav-link text-white px-0 align-middle"
                                >
                                    <i className="fs-4 bi-person ms-2"></i>
                                    <span className="ms-2 d-none d-sm-inline">Profile</span>
                                </Link>
                            </li>
                            <div className="mt-auto">
                            <Link
                                className="nav nav-pills nav-item nav-link px-0 align-middle text-white mb-4"
                                onClick={handleLogout}
                            >
                                <i className="fs-4 bi-power ms-2"></i>
                                <span className="ms-2 d-none d-sm-inline">Logout</span>
                            </Link>
                        </div>
                        </ul>
                        
                        <div className="mt-auto">
                            <hr className="w-100" style={{ border: '2px solid white' }} />
                            To Add More Admins, Please Contact the Super Admin.
                        </div>
                    </div>
                </div>
                <div className="col p-0" style={{ marginLeft: '260px' }}>
                    <div className="">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
