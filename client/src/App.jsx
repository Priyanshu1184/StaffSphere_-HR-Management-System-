import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./components/Pages/Login.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import Home from "./components/Admin/Home.jsx";
import Employee from "./components/Admin/Employee.jsx";
import AddEmployee from "./components/Admin/AddEmployee.jsx";
import Start from "./components/Start.jsx";
import axios from 'axios';
import { Toaster } from "react-hot-toast";
import EditEmployee from './components/Admin/EditEmployee.jsx';
import EmployeeLogin from './components/Pages/EmployeeLogin.jsx';
import EmployeeDetail from './components/Employee/EmployeeDetail.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import EmpDashboard from './components/Employee/EmpDashboard.jsx';
import UpdateEmployee from './components/Employee/UpdateEmployee.jsx';
import LeaveReq from './components/Employee/LeaveReq.jsx';
import EmpHistory from './components/Employee/EmpHistory.jsx';
import LeaveRequestsAdmin from './components/Admin/LeaveRequestsAdmin.jsx';
import EventScheduler from './components/Admin/EventScheduler.jsx';
import PayrollDisplay from './components/Admin/PayRoll.jsx';
import EditAdmin from './components/Admin/EditAdmin.jsx';
import EventSchedule from './components/Employee/EventSchedule.jsx';
import AdminRegistration from './components/Pages/AdminRegistration.jsx';
import EmpEnroll from './components/Admin/Enrollment.jsx';
import ModuleDashboard from './components/Employee/Module.jsx';
import { UserProvider } from './UserContext';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <UserProvider> {/* Wrap your app with UserProvider */}
        <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
        <Routes>
          <Route path='/' element={<Start />} ></Route>
          <Route path='/employee_login' element={<EmployeeLogin />} />
          <Route path='/adminlogin' element={<Login />} />
          <Route path='/adminRegister' element={<AdminRegistration />} />

          <Route path='/dashboard' element={
            <PrivateRoute>
                <Dashboard />
            </PrivateRoute>
          } >
            <Route path='/dashboard' element={<Home />} ></Route>
            <Route path='/dashboard/employee' element={<Employee />} ></Route>
            <Route path='/dashboard/add_employee/' element={<AddEmployee />} ></Route>
            <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />} ></Route>
            <Route path='/dashboard/leave_request/' element={<LeaveRequestsAdmin />} ></Route>
            <Route path='/dashboard/EventScheduler' element={<EventScheduler />} ></Route>
            <Route path='/dashboard/payroll' element={<PayrollDisplay />} ></Route>
            <Route path='/dashboard/editAdmin/:id' element={<EditAdmin />} ></Route>
            <Route path='/dashboard/empenroll' element={<EmpEnroll />} ></Route>

          </Route>

          <Route path='/EmpDashboard' element={<EmpDashboard />} >
            <Route path='employee_detail/:id' element={<EmployeeDetail />} />
            <Route path='employee_update/:id' element={<UpdateEmployee />} />
            <Route path='LeaveReq/:id' element={<LeaveReq />} ></Route>
            <Route path='EmpHisory/:id' element={<EmpHistory />} />
            <Route path='EventSchedule/:id' element={<EventSchedule />} />
            <Route path='TrainingModules/:id' element={<ModuleDashboard />} />
          </Route>

        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
