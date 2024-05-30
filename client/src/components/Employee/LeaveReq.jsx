import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './CSS/LeaveReq.css'; // Import custom CSS file
import { toast } from "react-hot-toast";

const LeaveReq = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [leaveId, setLeaveId] = useState(null);

  const [leave, setLeave] = useState({
    name: '',
    empid: '',
    fromDate: '',
    toDate: '',
    reason: '',
    email: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/employee/detail/${id}`)
      .then(result => {
        const empdetail = result.data.Result;
        setLeaveId(result.data.Result._id);
        setEmployee(empdetail);
        setLeave({
          name: empdetail.name,
          empid: empdetail._id,
          fromDate: '',
          toDate: '',
          reason: '',
          email: empdetail.email,
        });
      })
      .catch(err => console.log(err));

    axios.defaults.withCredentials = true;

    axios.get(`/employee/leavereqEmp/${id}`)
      .then(result => {
        setLeaveRequests(result.data.leaveRequests);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError('Error fetching leave requests');
        setLoading(false);
      });
  }, [id]);

  const handleDecision = (leaveId) => {
    axios.delete(`/employee/leaveWithdrawEmp/${leaveId}`)
      .then(result => {
        if (result.data.Status) {
          toast.success("Leave request withdrawn successfully");
          setLeaveRequests(leaveRequests.filter(request => request._id !== leaveId));
        } else {
          toast.error("Error updating leave request status");
        }
      })
      .catch(err => {
        console.log('Error updating leave request status:', err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeave(prevLeave => ({ ...prevLeave, [name]: value }));
  };

  const handleSubmit = (event) => {
    if (new Date(leave.fromDate) >= new Date(leave.toDate)) {
      toast.error("Start date must be before the end date.");
      return;
    }
    axios.post('/employee/leave_request', leave)
      .then(result => {
        if (result.data.Status) {
          navigate(`/EmpDashboard/LeaveReq/${id}`);
          toast.success("Leave request submitted successfully");
          setLeave("");
        } else {
          toast.error(result.data.error);
        }
      })
      .catch(err => console.log(err));
  };

  const pendingRequests = leaveRequests.filter(request => request.status === 'Pending');
  const otherRequests = leaveRequests.filter(request => request.status !== 'Pending');

  return (
    <div className="container ">
      <div className='row'>
        <div className='col-12 col-md-5 mb-2'>
          <div className="leave-request-container">
            <section className="leave-request">
              <header className="mb-2">
                <div className='d-flex align-items-center justify-content-center'>
                  <i className="bi bi-calendar text-primary fs-2"></i>
                  <h1 className="fs-3 font-weight-bold ms-3 pt-2">Apply For Leave</h1>
                </div>
              </header>

              <form id="LeaveRequestForm" onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label fs-5">Name</label>
                    <input
                      type="text"
                      className="form-control text-center name"
                      value={employee.name || ''}
                      readOnly
                    />
                  </div>
                  <div className="col">
                    <label className="form-label fs-5">E-Mail</label>
                    <input
                      type="text"
                      className="form-control text-center name"
                      value={employee.email || ''}
                      readOnly
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label fs-5">Employee ID</label>
                    <input
                      className="form-control text-dark"
                      value={id}
                      readOnly
                    />
                  </div>
                  <div className="col">
                    <label className="form-label fs-5">Reason</label>
                    <textarea
                      name="reason"
                      className="form-control"
                      placeholder="Reason for the leave"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label fs-5">
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="fromDate"
                      className="form-control"
                      onChange={handleChange}
                      required

                    />
                  </div>
                  <div className="col">
                    <label className="form-label fs-5">
                      End Date
                    </label>
                    <input
                      type="date"
                      name="toDate"
                      className="form-control"
                      onChange={handleChange}
                      required

                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary shadow-sm fs-5"
                >
                  Submit
                </button>
              </form>
            </section>
          </div>
        </div>
        <div className='leave-table-container col-12 col-md-7 mt-2' >
          {/* Pending Leave Requests Table */}
          <h3 className="my-2">Pending Requests</h3>
          <div className="table-container">
            <div className="table-scrollable-x">
              <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>Employee Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingRequests.map(request => (
                    <tr key={request._id}>
                      <td>{request.name}</td>
                      <td>{new Date(request.fromdate).toLocaleDateString()}</td>
                      <td>{new Date(request.todate).toLocaleDateString()}</td>
                      <td style={{ overflow: "hidden" }}>{request.reason}</td>
                      <td>
                        <button
                          className="btn btn-success me-2"
                          onClick={() => handleDecision(request._id)}
                        >
                          Withdraw
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Other Leave Requests Table */}
          <h3 className="mt-2">History</h3>
          <div className="table-container mb-3 ">
            <div className="table-scrollable-y">
              <table className="table table-bordered table-hover">
                <thead className="thead-dark">
                  <tr>
                    <th>Employee Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {otherRequests.map(request => (
                    <tr key={request._id}>
                      <td data-label="Employee Name">{request.name}</td>
                      <td data-label="Start Date">{new Date(request.fromdate).toLocaleDateString()}</td>
                      <td data-label="End Date">{new Date(request.todate).toLocaleDateString()}</td>
                      <td data-label="Reason">{request.reason}</td>
                      <td data-label="Status">{request.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveReq;

