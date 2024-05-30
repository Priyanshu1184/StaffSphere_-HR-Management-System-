import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CSS/PayRoll.css';

const PayrollDisplay = () => {
    const [payrolls, setPayrolls] = useState([]);

    useEffect(() => {
        axios.get('/payroll')
            .then(result => {
                if (result.data.Status) {
                    const payrollData = result.data.Result.map(employee => {
                        const grossSalary = employee.salary;
                        const deductions = calculateDeductions(grossSalary);
                        const netPay = grossSalary - deductions;
                        const paymentDate = getLastDayOfMonth();

                        return {
                            ...employee,
                            grossSalary,
                            deductions,
                            netPay,
                            paymentDate,
                        };
                    });
                    setPayrolls(payrollData);
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    }, []);

    const calculateDeductions = (grossSalary) => {
        // Placeholder deduction rates, you can replace these with actual values
        const federalTax = grossSalary * 0.1;
        const stateTax = grossSalary * 0.05;
        const socialSecurity = grossSalary * 0.062;
        const medicare = grossSalary * 0.0145;
        const healthInsurance = 100; // Fixed amount
        const retirementContribution = grossSalary * 0.05;

        return federalTax + stateTax + socialSecurity + medicare + healthInsurance + retirementContribution;
    };

    const getLastDayOfMonth = () => {
        const date = new Date();
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        return lastDay.toLocaleDateString();
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        alert('Payroll submitted successfully!');
    };

    return (
        <div className="detailContainer pt-4  p-4" style={{padding: "20px"}}>
        <div className="card shadow-sm p-4 mb-4 rounded payroll-heading">
          <h2 className="text-center mb-3">Payroll List</h2>
          <hr />
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                                <th>Employee ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Position</th>
                                <th>Gross Salary</th>
                                <th>Net Pay</th>
                                <th>Deductions</th>
                                <th>Payment Date</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {payrolls.map(payroll => (
                                <tr key={payroll._id}>
                                    <td>{payroll._id}</td>
                                    <td>{payroll.name}</td>
                                    <td>{payroll.email}</td>
                                    <td>{payroll.position}</td>
                                    <td>₹{payroll.grossSalary.toFixed(2)}</td>
                                    <td>₹{payroll.netPay.toFixed(2)}</td>
                                    <td>₹{payroll.deductions.toFixed(2)}</td>
                                    <td>{payroll.paymentDate}</td>
                                    <button className='btn btn-success px-3 m-1 text-white' onClick={handleSubmit}>Pay</button>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
            
        </div>
    );
};

export default PayrollDisplay;
