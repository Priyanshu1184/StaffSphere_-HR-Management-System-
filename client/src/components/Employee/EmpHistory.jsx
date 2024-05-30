import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import './CSS/EmpHistory.css';
import { useParams } from 'react-router-dom';

const EmploymentForm = () => {
    const { id } = useParams();
    const [employments, setEmployments] = useState([
        { companyName: '', jobTitle: '', startDate: '', endDate: '', jobDescription: '', userId: id }
    ]);
    const [previousEmployments, setPreviousEmployments] = useState([]);

    useEffect(() => {
        axios.get(`/employee/employment_history/${id}`)
            .then(result => {
                if (result.data.Status) {
                    setPreviousEmployments(result.data.Result);
                } else {
                    toast.error('Failed to get employment history.');
                }
            });
    }, [id]);

    const handleInputChange = (index, event) => {
        const values = [...employments];
        values[index][event.target.name] = event.target.value;
        setEmployments(values);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const employment = employments[0];
        if (new Date(employment.startDate) >= new Date(employment.endDate)) {
            toast.error("Start date must be before the end date.");
            return;
        }
        if (!employment.companyName || !employment.jobTitle || !employment.startDate || !employment.endDate || !employment.jobDescription) {
            toast.error('All fields are required.');
            return;
        }

        axios.post(`/employee/employment/${id}`, { employments })
            .then(result => {
                toast.success('Employment history submitted successfully!');
                axios.get(`/employee/employment_history/${id}`)
                    .then(result => {
                        if (result.data.Status) {
                            setPreviousEmployments(result.data.Result);
                        } else {
                            toast.error('Failed to get employment history.');
                        }
                    });
            })
            .catch(error => {
                toast.error('Failed to submit employment history.');
                console.error('Error submitting employment history:', error);
            });
    };

    const handleDelete = (employmentId) => {
        axios.delete(`/employee/empHistoryDelete/${employmentId}`)
            .then(result => {
                if (result.data.Status) {
                    toast.success('Employment history deleted successfully!');
                    setPreviousEmployments(previousEmployments.filter(emp => emp._id !== employmentId));
                    setEmployments("");
                } else {
                    toast.error('Failed to delete employment history.');
                }
            })
            .catch(error => {
                toast.error('Failed to delete employment history.');
                console.error('Error deleting employment history:', error);
            });
    };

    return (
        <div className="mt-2 container">
            <div className="row">
                <div className="col-md-6">
                    <div className="history-add-container form-card" style={{ marginTop: "40px" }}>
                        <h2 className="text-center m-3">
                            <i className="bi bi-clock-history text-primary fs-3 x"></i> Employment History
                        </h2>
                        <hr />
                        <form onSubmit={handleSubmit}>
                            {employments.map((employment, index) => (
                                <div key={index} className="mb-3">
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor={`companyName-${index}`} className="form-label fs-5">Company</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id={`companyName-${index}`}
                                                name="companyName"
                                                value={employment.companyName}
                                                onChange={(event) => handleInputChange(index, event)}
                                            />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor={`jobTitle-${index}`} className="form-label fs-5">Job Title</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id={`jobTitle-${index}`}
                                                name="jobTitle"
                                                value={employment.jobTitle}
                                                onChange={(event) => handleInputChange(index, event)}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor={`startDate-${index}`} className="form-label fs-5">Start Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id={`startDate-${index}`}
                                                name="startDate"
                                                value={employment.startDate}
                                                onChange={(event) => handleInputChange(index, event)}
                                            />
                                        </div>
                                        <div className="mb-3 col-md-6">
                                            <label htmlFor={`endDate-${index}`} className="form-label fs-5">End Date</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id={`endDate-${index}`}
                                                name="endDate"
                                                value={employment.endDate}
                                                onChange={(event) => handleInputChange(index, event)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor={`jobDescription-${index}`} className="form-label fs-5">Job Description</label>
                                        <textarea
                                            className="form-control"
                                            id={`jobDescription-${index}`}
                                            name="jobDescription"
                                            rows="3"
                                            value={employment.jobDescription}
                                            onChange={(event) => handleInputChange(index, event)}
                                        ></textarea>
                                    </div>
                                </div>
                            ))}
                            <button type="submit" className="btn btn-primary mb-3">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="cardHis table-card">
                        <div className="scrollable-table-container">
                            <h2>Summary</h2>
                            {previousEmployments.length > 0 ? (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Company Name</th>
                                            <th>Job Title</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Job Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previousEmployments.map((employment, index) => (
                                            <tr key={employment._id}>
                                                <td>{employment.companyName}</td>
                                                <td>{employment.jobTitle}</td>
                                                <td>{new Date(employment.startDate).toLocaleDateString()}</td>
                                                <td>{new Date(employment.endDate).toLocaleDateString()}</td>
                                                <td>{employment.jobDescription}</td>
                                                <td>
                                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(employment._id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className='text-center'>No previous employment history available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmploymentForm;
