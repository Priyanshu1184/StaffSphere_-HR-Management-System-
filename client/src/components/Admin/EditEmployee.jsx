import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CSS/EditEmployee.css';

const EditEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        category: "",
        position:""
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/employee/${id}`)
            .then(result => {
                const data = result.data.Result[0];
                setEmployee({
                    name: data.name,
                    email: data.email,
                    address: data.address,
                    salary: data.salary,
                    category: data.category,
                });
            })
            .catch(err => console.log(err));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/edit_employee/${id}`, employee)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/employee');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="edit-employee-container">
            <div className="edit-employee-form">
                <h3>Edit Employee</h3>
                <form className="row g-1" onSubmit={handleSubmit}>
                    <div className="col-12">
                        <label htmlFor="inputName" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputName"
                            placeholder="Enter Name"
                            value={employee.name}
                            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputEmail4" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="inputEmail4"
                            placeholder="Enter Email"
                            autoComplete="off"
                            value={employee.email}
                            onChange={(e) =>
                                setEmployee({ ...employee, email: e.target.value })
                            }
                        />
                    </div>
                    <div className='col-12'>
                        <label htmlFor="inputSalary" className="form-label">
                            Salary
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputSalary"
                            placeholder="Enter Salary"
                            autoComplete="off"
                            value={employee.salary}
                            onChange={(e) =>
                                setEmployee({ ...employee, salary: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            placeholder="1234 Main St"
                            autoComplete="off"
                            value={employee.address}
                            onChange={(e) =>
                                setEmployee({ ...employee, address: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="position" className="form-label">
                            Position
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputAddress"
                            placeholder="Update Position"
                            autoComplete="off"
                            value={employee.position}
                            onChange={(e) =>
                                setEmployee({ ...employee, position: e.target.value })
                            }
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="category" className="form-label">
                            Category
                        </label>
                        <select name="category" id="category" className="form-select"
                            value={employee.category}
                            onChange={(e) => setEmployee({ ...employee, category: e.target.value })}>
                            <option value="IT">IT</option>
                            <option value="Software">Software</option>
                            <option value="Law">Law</option>
                            <option value="Finance">Finance</option>
                        </select>
                    </div>

                    <div className="col-12 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Edit Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditEmployee;
