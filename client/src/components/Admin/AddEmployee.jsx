import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category: "",
    position:"",
    doj:"",
    image: null,
  });
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('password', employee.password);
    formData.append('address', employee.address);
    formData.append('salary', employee.salary);
    formData.append('category', employee.category);
    formData.append('position', employee.position);
    formData.append('doj', employee.doj);
    formData.append('image', employee.image);


    axios.post('/add_employee', formData, {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
    })
    .then(result => {
        if(result.data.Status) {
            navigate('/dashboard/employee')
        } else {
            alert(result.data.Error)
        }
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{marginTop:"20px"}}>
      <div className="p-3 m-0 rounded w-100 border">
        <h3 className="text-center">Add Employee</h3>
        <form className="row g-1"  onSubmit={handleSubmit}>
          <div className="row g-1">
          <div className="col col-6 ">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              style={{width:"100%"}}
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className=" col col-6">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          </div>
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setEmployee({ ...employee, password: e.target.value })
              }
            />
            <label htmlFor="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
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
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select name="category" id="category" className="form-select"
                onChange={(e) => setEmployee({...employee, category: e.target.value})}>
                <option value="" selected disabled>Select The Respective Department</option>
                <option value="IT">IT</option>
                <option value="Software">Software</option>
                <option value="Law">Law</option>
                <option value="Finance">Finance</option>
            </select>
          </div>
          <div className="row g-1">
          <div className="col col-6">
            <label htmlFor="inputAddress" className="form-label">
              Position
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="position"
              placeholder="Selected Position"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, position: e.target.value })
              }
            />
          </div>
          <div className="col col-6">
            <label htmlFor="inputAddress" className="form-label">
              Date Of Joining
            </label>
            <input
              type="date"
              className="form-control rounded-0"
              id="doj"
              placeholder="Enter Date of Joining"
              autoComplete="off"
              onChange={(e) =>
                setEmployee({ ...employee, doj: e.target.value })
              }
            />
          </div>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label" htmlFor="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              onChange={(e) => setEmployee({...employee, image:e.target.files[0]})}
            />
            </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
