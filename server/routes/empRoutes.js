const express = require("express");
const router = express.Router();
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

const {
    emplogin,
    empdetail,
    leaveReq,
    leavereqEmp,
    leaveWithdrawEmp,
    empHistory,
    getempHistory,
    empHistoryDelete,
    empModuleStatus,
    getempModule,
    incompleteModule
    
} = require("../controllers/empController");
const { empModule } = require("../models/user");

router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173",
    })
);
router.post("/employee/employee_login", emplogin);
router.get("/employee/detail/:id",empdetail);
router.post("/employee/leave_request",leaveReq);
router.get("/employee/leavereqEmp/:id", leavereqEmp);
router.delete("/employee/leaveWithdrawEmp/:id", leaveWithdrawEmp);
router.post("/employee/leave_request",leaveReq);
router.post("/employee/employment/:id",empHistory);
router.get("/employee/employment_history/:id",getempHistory);
router.delete("/employee/empHistoryDelete/:id",empHistoryDelete);
router.post("/employee/completedModules", empModuleStatus);
router.get("/employee/:employeeId/completedModules", getempModule);
router.get('/employee/:employeeId/incompleteModules',incompleteModule);


router.get("/emp_Logout",async (req,res)=>{
    try {
        console.log("Logout request received"); // Debug log
        res.clearCookie('token'); // Clear the authentication cookie
        console.log("Cookie cleared"); // Debug log
        return res.json({ Status: true, Message: "Logout successful" });
    } catch (error) {
        console.log("Logout error:", error); // Debug log
        return res.json({ Status: false, Error: error.message });
    }
});

module.exports = router;