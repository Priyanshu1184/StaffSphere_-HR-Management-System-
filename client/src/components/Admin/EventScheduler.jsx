import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import './CSS/Calendar.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import "./CSS/EventCalendar.css";
import { Button } from 'react-bootstrap';

const EventScheduler = () => {
  const [event, setEvent] = useState({
    title: '',
    date: '',
    additional: ''
  });
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent({
      ...event,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const today = new Date();
    const selectedEventDate = new Date(event.date);
    
    if (selectedEventDate < today) {
      toast.error("Event date cannot be in the past");
      return;
    }

    axios.post('/event', event)
      .then(result => {
        if (result.data.Status) {
          toast.success("Event created successfully");
          setEvents([...events, { ...event, _id: result.data.Result._id }]);
        }
      })
      .catch(error => {
        toast.error("Error creating event");
        console.error(error);
      });

    setEvent({
      title: '',
      date: '',
      additional: ''
    });
  };

  useEffect(() => {
    axios.get('/events')
      .then(result => {
        if (result.data.Status) {
          setEvents(result.data.Result);
        }
      })
      .catch(error => {
        toast.error("Error fetching events");
        console.error(error);
      });
  }, []);

  const renderEvents = (date) => {
    const dayEvents = events.filter(event => new Date(event.date).toDateString() === date.toDateString());
    return (
      <div className='event-highlight'>
        {dayEvents.map(event => (
          <div key={event._id} className="event">
            {event.title}
          </div>
        ))}
      </div>
    );
  };

  const handleDelete = (id) => {
    axios.delete(`/event_delete/${id}`)
      .then(result => {
        if (result.data.Status) {
          toast.success("Successfully Deleted");
          setEvents(events.filter(event => event._id !== id));
        } else {
          toast.error("Error While Deleting: " + result.data.Message);
        }
      })
      .catch(error => {
        toast.error("Error While Deleting");
        console.error(error);
      });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="detailContainer pt-1 p-4 pb-0" style={{ padding: "20px" }}>
      <div className="card shadow-sm p-4 mb-4 rounded leave-request-heading">
        <h2 className='text-center'>Events</h2>
        <hr />
        <div className="row">
          {/* Create Event Form */}
          <div className="col-md-4">
            <div className="create-event-form card m-3">
              <h3 className='text-center'>Create Event</h3>
              <hr />
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="title" className='fs-4'>Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder='Enter Your Event Title'
                    id="title"
                    name="title"
                    value={event.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="date" className='fs-4'>Date</label>
                  <input
                    type="date"
                    className="form-control"
                    placeholder='Enter Your Event Date'
                    id="date"
                    name="date"
                    style={{ width: '210px' }}
                    value={event.date}
                    onChange={handleInputChange}
                    min={today} // Set the minimum date to today
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="additional" className='fs-4'>Additional</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder='Enter Your Event Details'
                    id="additional"
                    name="additional"
                    value={event.additional}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2 mb-1">Create Event</button>
              </form>
            </div>
          </div>

          {/* Calendar */}
          <div className="col-md-8">
            <div className="calendar-container card m-3">
              <h3 className="text-center">Calendar</h3>
              <hr />
              <Calendar
                value={selectedDate}
                onClickDay={date => setSelectedDate(date)}
                tileContent={({ date, view }) => view === 'month' && renderEvents(date)}
              />
            </div>
          </div>
        </div>
        <hr className='divider'></hr>
        {/* Event Log */}
        <div className="row m-3 card text-center">
          <h3>Event Log</h3>
          <ul>
            <table className="table table-bordered table-hover">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Additional</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event, index) => (
                  <tr key={index}>
                    <td>{event.title}</td>
                    <td>{new Date(event.date).toLocaleDateString()}</td>
                    <td>{event.additional}</td>
                    <td>
                      <button className='btn btn-warning' onClick={() => handleDelete(event._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventScheduler;
