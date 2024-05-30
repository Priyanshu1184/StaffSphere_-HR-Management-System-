import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import './CSS/LeaveRequestAdmin.css'; // Import custom CSS file

const LeaveRequestsAdmin = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get('/leave_requests')
      .then(result => {
        setLeaveRequests(result.data.Result);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError('Error fetching leave requests');
        setLoading(false);
      });
  }, []);

  const handleDecision = (id, status) => {
    axios.post(`/leave_requests/${id}`, { status })
      .then(result => {
        if(result.data.status){
          toast.success("Leave request status updated successfully");
          setLeaveRequests(prevRequests =>
            prevRequests.map(req =>
              req._id === id ? { ...req, status } : req
            )
          );
        } else {
          toast.error("Error updating leave request status");
        }
      })
      .catch(err => {
        console.log('Error updating leave request status:', err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const pendingRequests = leaveRequests.filter(request => request.status === 'Pending');
  const otherRequests = leaveRequests.filter(request => request.status !== 'Pending');

  return (
    <div className="detailContainer pt-1  p-4 pb-0" style={{padding: "20px"}}>
      <div className="card shadow-sm p-4 mb-4 rounded leave-request-heading">
        <h2 className="text-center">Leave Request's</h2>
        <hr></hr>
        
        <h3 className="mt-4">Pending Request's</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>E-Mail</th>
                <th>Employee Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Actions</th>
              </tr>
            </thead>
            { leaveRequests.length > 0 ? (
            <tbody>
              {pendingRequests.map(request => (
                <tr key={request._id}>
                  <td>{request.email}</td>
                  <td>{request.name}</td>
                  <td>{new Date(request.fromdate).toLocaleDateString()}</td>
                  <td>{new Date(request.todate).toLocaleDateString()}</td>
                  <td>{request.reason}</td>
                  <td>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleDecision(request._id, 'Accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDecision(request._id, 'Rejected')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            ) : (
            <tbody>
              <tr className='align-items-center text-center'>
                <td colSpan="6">
                  <h6>No Active Request</h6>
                </td>
              </tr>
            </tbody>
            )}
          </table>
        </div>

        {/* Other Leave Requests Table */}
        <h3 className="mt-4">Log</h3>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>E-Mail</th>
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
                  <td>{request.email}</td>
                  <td>{request.name}</td>
                  <td>{new Date(request.fromdate).toLocaleDateString()}</td>
                  <td>{new Date(request.todate).toLocaleDateString()}</td>
                  <td>{request.reason}</td>
                  <td>{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestsAdmin;
