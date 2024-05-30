import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/UpdateEmployee.css'; // Import custom CSS file

const UpdateEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
        dob: "",
        gender: "",
        maritalStatus: "",
        bankAccount: "",
        taxId: "",
        hobbies: "",
        salary: "",
        postGraduation: "",
        Graduation: "",
        Schooling: "",
        IFSC: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/employee/' + id)
            .then(result => {
                const data = result.data.Result[0];
                setEmployee({
                    name: data.name,
                    email: data.email,
                    password: "", // Don't populate the password field
                    address: data.address,
                    dob: data.dob || "",
                    salary: data.salary || "",
                    gender: data.gender || "",
                    maritalStatus: data.maritalStatus || "",
                    bankAccount: data.bankAccount || "",
                    taxId: data.taxId || "",
                    postGraduation: data.postGraduation || "",
                    hobbies: data.hobbies || "",
                    Graduation: data.Graduation || "",
                    Schooling: data.Schooling || "",
                    IFSC: data.IFSC || "",
                });
            }).catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedEmployee = { ...employee };
        if (!updatedEmployee.password.trim()) {
            delete updatedEmployee.password; // Remove the password field if it's empty
        }

        axios.put('http://localhost:8000/edit_employee/' + id, updatedEmployee)
            .then(result => {
                if (result.data.Status) {
                    navigate("/EmpDashboard/employee_detail/" + id);
                } else {
                    alert(result.data.Error);
                }
            }).catch(err => console.log(err));  
    };

    return (
        <div className="no-scrollbar mt-4">
            <div className="row justify-content-spacebetween">
                <div className="box col-md-6 mt-2">
                    <div className="rounded p-1">
                        <div className="d-flex align-items-center bg-dark justify-content-center rounded pt-3">
                            <i className="bi bi-person-fill header-icon text-white fs-3"></i>
                            <h5 className="header-title text-white pt-2">Update Personal Information</h5>
                        </div>
                        <form>
                            <div className='row pt-4'>
                                <div className="col mb-3">
                                    <label htmlFor="inputName" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        className="form-control text-dark"
                                        id="inputName"
                                        value={employee.name}
                                        placeholder="Enter your name"
                                        readOnly
                                    />
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail"
                                        value={employee.email}
                                        placeholder="Enter your email"
                                        readOnly
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col mb-3">
                                    <label htmlFor="inputAddress" className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputAddress"
                                        value={employee.address}
                                        placeholder="Enter your address"
                                        onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
                                    />
                                </div>
                                <div className=" col mb-3">
                                    <label htmlFor="inputPassword" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Set your own password"
                                        id="inputPassword"
                                        value={employee.password}
                                        onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className=" col mb-3">
                                    <label htmlFor="inputDOB" className="form-label">Date of Birth</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="inputDOB"
                                        value={employee.dob}
                                        placeholder="Enter your date of birth"
                                        onChange={(e) => setEmployee({ ...employee, dob: e.target.value })}
                                    />
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="inputGender" className="form-label">Gender</label>
                                    <select
                                        className="form-select"
                                        id="inputGender"
                                        value={employee.gender}
                                        onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
                                    >
                                        <option value="" disabled>Select Your Gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Non-Binary</option>
                                    </select>
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="inputMaritalStatus" className="form-label">Marital Status</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputMaritalStatus"
                                        placeholder="Enter your marital status"
                                        value={employee.maritalStatus}
                                        onChange={(e) => setEmployee({ ...employee, maritalStatus: e.target.value })}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="box col-md-6 mt-2" style={{ marginLeft: "-10px" }}>
                    <div className="rounded p-1">
                        <div className="d-flex align-items-center bg-dark rounded justify-content-center pt-3">
                            <i className="bi bi-currency-rupee text-white fs-3"></i>
                            <h5 className="header-title text-white pt-2">Financial and Education Information</h5>
                        </div>
                        <form>
                            <div className='row pt-4'>
                                <div className='col mb-3'>
                                    <label htmlFor="inputSalary" className="form-label">Salary</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="inputSalary"
                                        value={employee.salary}
                                        placeholder="Enter your salary"
                                        onChange={(e) => setEmployee({ ...employee, salary: e.target.value })}
                                    />
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="inputBankAccount" className="form-label">Bank Account</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputBankAccount"
                                        value={employee.bankAccount}
                                        placeholder="Enter your bank account number"
                                        onChange={(e) => setEmployee({ ...employee, bankAccount: e.target.value })}
                                    />
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="inputTaxId" className="form-label">Tax ID</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputTaxId"
                                        value={employee.taxId}
                                        placeholder="Enter your tax ID"
                                        onChange={(e) => setEmployee({ ...employee, taxId: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col mb-3">
                                    <label htmlFor="inputPostGraduation" className="form-label">Post Graduation</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputPostGraduation"
                                        value={employee.postGraduation}
                                        placeholder="Enter your post graduation details"
                                        onChange={(e) => setEmployee({ ...employee, postGraduation: e.target.value })}
                                    />
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="inputGraduation" className="form-label">Graduation</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputGraduation"
                                        value={employee.Graduation}
                                        placeholder="Enter your graduation details"
                                        onChange={(e) => setEmployee({ ...employee, Graduation: e.target.value })}
                                    />
                                </div>
                                <div className="col mb-3">
                                    <label htmlFor="inputSchooling" className="form-label">Schooling</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputSchooling"
                                        value={employee.Schooling}
                                        placeholder="Enter your schooling details"
                                        onChange={(e) => setEmployee({ ...employee, Schooling: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className='row'>
                            <div className="col mb-3">
                                <label htmlFor="inputIFSC" className="form-label">IFSC</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputIFSC"
                                    value={employee.IFSC}
                                    placeholder="Enter your bank IFSC code"
                                    onChange={(e) => setEmployee({ ...employee, IFSC: e.target.value })}
                                />
                            </div>
                            <div className="col mb-3">
                                <label htmlFor="inputHobbies" className="form-label">Hobbies</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputHobbies"
                                    value={employee.hobbies}
                                    placeholder="Enter your hobbies"
                                    onChange={(e) => setEmployee({ ...employee, hobbies: e.target.value })}
                                />
                            </div>
                            </div>
                            
                        </form>
                    </div>
                    
                </div>
                <div className="d-flex justify-content-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary m-3"
                                    onClick={handleSubmit}
                                >
                                    Update
                                </button>
                            </div>
            </div>
        </div>
    );
};

export default UpdateEmployee;
