import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './CSS/Employee.css'; // Import custom CSS file

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/employee")
      .then((result) => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('/delete_employee/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload();
        } else {
            alert(result.data.Error);
        }
    });
  };

  return (
    <div className="detailContainer pt-1 p-4 pb-0">
      <div className="card shadow-sm p-4 mb-4 rounded leave-request-heading">
        <h2 className="text-center mb-3">Employee List</h2>
        <hr></hr>
        <Link to="/dashboard/add_employee" className="btn btn-primary  p-3 my-3 " style={{ border:"none", width:"29%"}}>
          Add Employee
        </Link>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Email</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>
                    <img
                      src={`http://localhost:8000/images/${employee.image}`}
                      alt={employee.name}
                      className="employee-image "
                      style={{ maxWidth: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{employee.email}</td>
                  <td>{employee.address}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <Link
                      to={`/dashboard/edit_employee/${employee._id}`}
                      className="btn btn-success p-2"
                      style={{width:"100px"}}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn  p-2 "
                      style={{width:"100px"}}
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;
