import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

const Registration = () => {
    const navigate=useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        category: '',
        position: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', formData);
            if (response.data.Status) {
                toast.success("Registration successful!");
                navigate('/')
                // Optionally, redirect the user to another page after successful registration
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registration</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="salary" className="form-label">Salary</label>
                    <input type="number" className="form-control" id="salary" name="salary" value={formData.salary} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <input type="text" className="form-control" id="category" name="category" value={formData.category} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="position" className="form-label">Position</label>
                    <input type="text" className="form-control" id="position" name="position" value={formData.position} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Registration;
