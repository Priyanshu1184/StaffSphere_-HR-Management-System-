import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import '../Admin/CSS/Calendar.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import "../Admin/CSS/EventCalendar.css";

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
    setEvents([...events, { ...event, id: events.length }]);
    axios.post('/event', event)
      .then(result => {
        if (result.data.Status) {
          toast.success("Event created successfully");
        }
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
  }, []);

  const renderEvents = (date) => {
    const dayEvents = events.filter(event => new Date(event.date).toDateString() === date.toDateString());
    return (
      <div className='event-highlight'>
        {dayEvents.map(event => (
          <div key={event.id} className="event">
            {event.title}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className="p-4 mb-3 ">
        <div className="row">
          {/* Event Log */}
        <div className="col-md-5 container">
            <div className="card my-3" style={{marginLeft:"60px" }}>
              <h3 className="text-center"><i className="fs-4 text-primary bi-calendar-event ms-2"></i>  Event Log</h3>
              <hr />
              <table className="table table-hover table-bordered">
                <thead>
                  <tr >
                    <th className='text-center'>Title</th>
                    <th className='text-center'>Date</th>
                    <th className='text-center'>Additional</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event, index) => (
                    <tr key={index}>
                      <td>{event.title}</td>
                      <td>{new Date(event.date).toLocaleDateString()}</td>
                      <td>{event.additional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Calendar */}
          <div className="col-md-6 calendar-container mt-3 mx-4">
            <div className="calendar-card card m-1 ">
              <h3 className="text-center mt-2">Calendar</h3>
              <hr />
              <Calendar
                value={selectedDate}
                onClickDay={date => setSelectedDate(date)}
                tileContent={({ date, view }) => view === 'month' && renderEvents(date)}
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default EventScheduler;
