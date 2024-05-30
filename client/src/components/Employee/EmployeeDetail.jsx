import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useParams } from 'react-router-dom';
import Calendar from 'react-calendar';
import axios from 'axios';
import './CSS/EmployeeDetail.css'; // Import custom CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Admin/CSS/Calendar.css';

const EmployeeDetail = () => {
  const [employee, setEmployee] = useState({});
  const [pendingLeaveRequests, setPendingLeaveRequests] = useState([]);
  const [events, setEvents] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/employee/detail/${id}`)
      .then(result => {
        setEmployee(result.data.Result);
      })
      .catch(err => console.log(err));
  }, [id]);

  useEffect(() => {
    fetchPendingLeaveRequests();
    axios.get('/events')
      .then(result => {
        if (result.data.Status) {
          setEvents(result.data.Result);
        } else {
          alert('Error fetching events');
        }
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  const fetchPendingLeaveRequests = () => {
    axios.get(`/pending_leave_requests/${id}`)
      .then(result => {
        if (result.data.Result) {
          const filteredRequests = result.data.Result.filter(request => request.status === 'Pending' || request.status === 'Accepted');
          setPendingLeaveRequests(filteredRequests.slice(0, 3)); // Only display the latest 3 pending or accepted leave requests
        } else {
          alert('Error fetching pending leave requests');
        }
      })
      .catch(error => {
        console.error('Error fetching pending leave requests:', error);
      });
  }

  const renderTileContent = ({ date, view }) => {
    if (view === 'month') {
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === date.toDateString();
      });

      if (dayEvents.length > 0) {
        return (
          <div className="event-highlight">
            {dayEvents.map(event => (
              <div key={event.id} className="event-marker">
                {event.title}
              </div>
            ))}
          </div>
        );
      }
    }
    return null;
  };

  function calculateDuration(startDate, endDate) {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  return (
    <div className='container-fluid'>
      <div className='row d-flex'>
        <div className='col-md-7 py-4'>
          <div className='row'>
            <div className="col-md-5">
              <div className=" card cardD text-white text-center employee-card bg-danger">
                <div className="card-header fs-5"><i className="bi bi-envelope"></i> E-Mail</div>
                <div className="card-body">
                  <p className="card-text " style={{fontSize:"15px"}}>{employee.email}</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card cardD text-dark text-center employee-card bg-light h-50">
                <div className="card-header fs-6"><i className="bi bi-currency-rupee"></i>Gross Salary</div>
                <div className="card-body">
                  <p className="card-text fs-5">Rs. {employee.salary}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card cardD text-white text-center employee-card bg-warning h-50">
                <div className="card-header fs-6"><i className="bi bi-file-post"></i> Department</div>
                <div className="card-body">
                  <p className="card-text fs-5">{employee.category}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='row '>
        <div className="col-md-7 py-4 w-100" >
          <div className="card cardD mb-3 shadow">
            <div className="card-body">
              <h4 className="card-title text-center">Leave Requests</h4>
              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Duration</th>
                    <th>Reason</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingLeaveRequests.map(request => (
                    <tr key={request._id}>
                      <td>{request.name}</td>
                      <td className='text-center'>{calculateDuration(new Date(request.fromdate), new Date(request.todate))}</td>
                      <td>{request.reason}</td>
                      <td>
                        <Link
                          to={`http://localhost:5173/EmpDashboard/LeaveReq/${id}`}
                          className="btn btn-danger p-2"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>

        </div>
        <div className="col-md-5 py-4 px-3 mt-4 rounded shadow h-50">
          <div className="card cardD shadow ">
            <div className="card-body ">
              <h4 className="card-title  text-center py-3" style={{ marginTop: "-20px" }}>Upcoming Event</h4>
              <Calendar
                tileContent={renderTileContent}
                className="calendar"
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default EmployeeDetail;
