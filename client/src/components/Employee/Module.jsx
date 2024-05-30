import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Admin/CSS/OnboardingDashboard.css';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';

const ModuleDashboard = () => {
  const [trainingModules, setTrainingModules] = useState([]);
  const [completedModules, setCompletedModules] = useState([]);
  const [employeeDepartment, setEmployeeDepartment] = useState('');
  const [employee, setEmployee] = useState('');

  const { id } = useParams();

  useEffect(() => {
    fetchTrainingModules();
    fetchCompletedModules();
    fetchEmployee();
  }, []);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`/employee/detail/${id}`);
      setEmployee(res.data.Result);
      setEmployeeDepartment(res.data.Result.category); // Corrected this line to use the response data directly
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
  };


  const fetchTrainingModules = async () => {
    try {
        const res = await axios.get(`/employee/${id}/incompleteModules`);
        setTrainingModules(res.data);
    } catch (error) {
        console.error('Error fetching training modules:', error);
    }
};

const fetchCompletedModules = async () => {
    try {
        const res = await axios.get(`/employee/${id}/completedModules`);
        setCompletedModules(res.data);
    } catch (error) {
        toast.error('Error fetching completed modules OR No Such Module');
    }
};

  const markAsCompleted = async (moduleId) => {
    const confirmCompletion = window.confirm("Are you sure you want to mark this module as completed? You won't be able to revisit it.");
    if (confirmCompletion) {
      try {
        await axios.post('/employee/completedModules', {
          employeeId: id,
          moduleId: moduleId
        });
        setTrainingModules(trainingModules.filter((module) => module._id !== moduleId));
        fetchCompletedModules();
      } catch (error) {
        console.error('Error marking module as completed:', error);
      }
    }
  };

  // Filter training modules based on employee's department
  const filteredModules = trainingModules.filter((module) => module.department === employeeDepartment) 

  return (
    <div className="detailContainer  p-3" style={{ padding: "20px" }}>
      <div className="card shadow-sm p-4 mb-4 rounded leave-request-heading">
        <h2>Training Modules</h2>
        <hr />
        <div className="dashboard">
          <div className="left-panel ">
            <div className="section">
              <h3>Incomplete Training Modules</h3>
              <div className="list-container ">
                <ul className="training-modules">
                  {filteredModules.map((module) => (
                    <li className="module-item listli" key={module._id}>
                      {module.name} - {module.department}<a href={module.file}>Check Your Module</a>
                      <button onClick={() => markAsCompleted(module._id)}>Mark as Completed</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="right-panel card">
            <div className="section">
              <h3>Completed Training Modules</h3>
              <div className="list-container">
                <ul className="completed-modules">
                  {completedModules.map((module) => (
                    <li className="module-item listli" style={{marginLeft:"-30px"}} key={module.moduleId._id}>
                      {module.moduleId.name} - {module.moduleId.department}
                      <span>Completed on: {new Date(module.completedAt).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleDashboard;
