import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/admin.css';
import './CSS/Calendar.css';

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [pendingLeaveRequests, setPendingLeaveRequests] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
    fetchPendingLeaveRequests();
    fetchEvents();
  }, []);

  const AdminRecords = () => {
    axios.get('/admin_records')
      .then(result => {
        if (result.data.Result) {
          setAdmins(result.data.Result);
        } else {
          alert('Error fetching admins');
        }
      });
  };

  const adminCount = () => {
    axios.get('/admin_count')
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result);
        }
      });
  };

  const employeeCount = () => {
    axios.get('/employee_count')
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result);
        }
      });
  };

  const salaryCount = () => {
    axios.get('/salary_count')
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result);
        } else {
          alert('Error fetching salary count');
        }
      });
  };

  const fetchPendingLeaveRequests = () => {
    axios.get('/pending_leave_requests')
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
  };

  const fetchEvents = () => {
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
  };

  function calculateDuration(startDate, endDate) {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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

  return (
    <Container className="mt-2 pt-0 p-2">
      <Row className="row-equal-height">
        <Col md={3} className="d-flex flex-column card-equal-height">
          <Card className="cardD mb-3 text-white bg-info shadow">
            <Card.Header>
              <i className="bi bi-person-fill me-2"></i> Admin
            </Card.Header>
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>Total: {adminTotal}</Card.Title>
            </Card.Body>
          </Card>
          <Card className=" cardD mb-3 bg-light shadow">
            <Card.Header>
              <i className="bi bi-people-fill me-2"></i> Employee
            </Card.Header>
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>Total: {employeeTotal}</Card.Title>
            </Card.Body>
          </Card>
          <Card className="cardD mb-3 text-white bg-warning shadow">
            <Card.Header>
              <i className="bi bi-currency-rupee me-2"></i> Total Assets
            </Card.Header>
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>Rs. {salaryTotal}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className=" d-flex flex-column calendar-container">
          <Card className="full-height">
            <Card.Body className="calendar-card">
              <h4 className="text-center p-2" style={{ marginTop: "-20px" }}>
                Upcoming Event
              </h4>
              <Calendar
                tileContent={renderTileContent}
                className=""
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="row-equal-height">
        <Col md={3} className="d-flex flex-column card-equal-height">
          <Card className="cardD card-equal-height" style={{maxWidth:"510px",maxHeight:"185px"}}>
            <Card.Body className="d-flex flex-column justify-content-between">
              <h4 className="text-center" style={{ marginTop: "-16px" }}>List of Admins</h4>
              <div className="table-wrapper-scroll-y">
                <Table striped bordered hover>
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {admins.map(admin => (
                      <tr key={admin._id}>
                        <td>{admin.name}</td>
                        <td>{admin.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
          </Col>
        <Col md={4} className="d-flex flex-column card-equal-height" >
          <Card className="cardD card-equal-height" style={{maxHeight:'185px',width:"595px", marginRight:"100px", marginLeft:"8px"}}>
            <Card.Body className="d-flex flex-column justify-content-between">
              <h4 className="text-center" style={{ marginTop: "-16px" }}>
                Pending Leave Requests
              </h4>
              <div className="table-wrapper-scroll-y" >
                <Table striped bordered hover>
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
                        <td>{calculateDuration(new Date(request.fromdate), new Date(request.todate))}</td>
                        <td>{request.reason}</td>
                        <td>
                          <Link
                            to="/dashboard/leave_request"
                            className="btn btn-info p-2"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
