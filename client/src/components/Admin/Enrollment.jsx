import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/OnboardingDashboard.css';

const OnboardingDashboard = () => {
  const [trainingModules, setTrainingModules] = useState([]);
  const [openPositions, setOpenPositions] = useState([]);
  const [openPositionsNumber, setOpenPositionsNumber] = useState([]);
  const [newModule, setNewModule] = useState('');
  const [newModuleFile, setNewModuleFile] = useState(null);
  const [newDepartment, setNewDepartment] = useState('');
  const [newPosition, setNewPosition] = useState('');

  useEffect(() => {
    fetchTrainingModules();
    fetchPositions();
  }, []);

  const fetchTrainingModules = async () => {
    const res = await axios.get('/trainingModules');
    setTrainingModules(res.data);
  };

  const fetchPositions = async () => {
    const res = await axios.get('/positions');
    setOpenPositions(res.data);
  };

  const addTrainingModule = async (e) => {
    e.preventDefault();
    if (newModule && newModuleFile) {
      const res = await axios.post('/trainingModules', {
        name: newModule,
        file: newModuleFile,
        department: newDepartment
      });
      setTrainingModules([...trainingModules, res.data]);
      setNewModule('');
      setNewDepartment(null)
      setNewModuleFile('')
    }
  };

  const openNewPosition = async (e) => {
    e.preventDefault();
    const res = await axios.post('/positions', { name: newPosition , number: openPositionsNumber });
    setOpenPositions([...openPositions, res.data]);
    setNewPosition('');
    setOpenPositionsNumber('')
  };

  const closeModule = async (id) => {
    await axios.delete(`/trainingModules/${id}`);
    setTrainingModules(trainingModules.filter((m) => m._id !== id));
  };

  const closePosition = async (id) => {
    await axios.delete(`/positions/${id}`);
    setOpenPositions(openPositions.filter((p) => p._id !== id));
  };


  return (
    <div className="detailContainer pt-1  p-4 pb-0" style={{padding: "20px"}}>
    <div className="card shadow-sm p-4 mb-4 rounded leave-request-heading">
      <h2 className="text-center">Employee Onboarding</h2>
      <hr></hr>
      <div className="dashboard">
        <div className="left-panel card h-100">
          <div className="section">
            <h3>Training Modules</h3>
            <form onSubmit={addTrainingModule}>
              <input
                type="text"
                value={newModule}
                onChange={(e) => setNewModule(e.target.value)}
                className='marginclass'
                placeholder="Add new module"
              />
              <input
                type="text"
                value={newModuleFile}
                onChange={(e) => setNewModuleFile(e.target.value)}
                className='marginclass'
                placeholder='Upload Module File Link'
              />
              <select onChange={(e)=>setNewDepartment(e.target.value)} className='marginclass'>
                <option value="" selected disabled>Select The Respective Department</option>
                <option value="IT">IT</option>
                <option value="Software">Software</option>
                <option value="Law">Law</option>
                <option value="Finance">Finance</option>
              </select>
              <button className="buttonclass" type="submit">Add Module</button>
            </form>
            <div className="list-container">
              <ul className="training-modules">
                {trainingModules.map((module) => (
                  <li className="module-item listli" key={module._id}>
                    {module.name} &nbsp; -- <a href={module.file}>Uploaded Module</a> -- &nbsp; {module.department}
                    <button className="buttonclass" onClick={() => closeModule(module._id)}>Close</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="right-panel card h-100">
          <div className="section">
            <h3>Create Job Openings: {openPositions.length}</h3>
            <form onSubmit={openNewPosition}>
              <input
                type="text"
                value={newPosition}
                onChange={(e) => setNewPosition(e.target.value)}
                className='marginclass'
                placeholder="Add new position"
              />
              <input
                type="number"
                value={openPositionsNumber}
                onChange={(e) => setOpenPositionsNumber(e.target.value)}
                className='marginclass'
                placeholder="Number of Opening"
              />
              <button className="buttonclass" type="submit">Open Position</button>
            </form>
            <div className="list-container">
              <ul className="open-positions">
                {openPositions.map((position) => (
                  <li className="position-item listli" key={position._id}>
                  <div>
                  {position.name} __ ({position.number})<button className="buttonclass" onClick={() => closePosition(position._id)}>Close</button>
                  </div>
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

export default OnboardingDashboard;
