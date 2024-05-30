const jwt = require("jsonwebtoken");
const { newEmployeeModel, LeaveModel, HisotryModel,empModule, TrainingModule } = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");


const emplogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await newEmployeeModel.findOne({ email: email });
        if (!email || !password) {
            return res.json({
                error: "Please Enter Your Credential To Continue",
            });
        }
        if (!user) {
            return res.json({
                error: "User not found",
            });
        }
        const match = await comparePassword(password, user.password);
        if (match) {
            const token = jwt.sign(
                { email: user.email, id: user._id, role: "employee" },
                process.env.JWT_SECRET,
                { expiresIn: "1d" }
            );
            res.cookie("token", token).json({ Status: true, result: user , id:user._id});
        } else {
            res.json({ error: "Please Check Your Password" });
        }
    } catch (error) {
        console.log(error);
    }
};

const empdetail = async (req, res) => {
    const id = req.params.id;
    const user = await newEmployeeModel.findOne({ _id: id })
    return res.json({ Status: true, Result: user })
};

const leaveReq = async (req, res) => {
    try {
        const { name, email, empid, reason, fromDate, toDate } = req.body;
        const user = await LeaveModel.create({
            name,
            email,
            empid,
            reason,
            fromdate: fromDate,
            todate: toDate
        });
        console.log(user);
        return res.json({ Status: true, Result: user });
    } catch (error) {
        console.log(error);
        return res.json({ Status: false, error: "Failed to create leave request" });
    }
};

const leavereqEmp=async(req,res)=>{
    const id=req.params.id;
    const user= await LeaveModel.find({empid:id})
    // console.log(user)
    return res.json({leaveRequests:user})
}

const leaveWithdrawEmp=async(req,res)=>{
    const id = req.params.id; // Ensure this matches the route parameter
    try {
        const result = await LeaveModel.deleteOne({ _id: id });
        if (result.deletedCount === 1) {
            return res.json({ Status: true, Message: "Leave request withdrawn successfully" });
        } else {
            return res.json({ Status: false, Error: "Leave request not found" });
        }
    } catch (error) {
        console.log(error);
        return res.json({ Status: false, Error: error.message });
}
}

const empHistory=async (req,res)=>{
    const user=await HisotryModel.create(req.body.employments)
    return res.json({ Status: true, Result: user });
}

const getempHistory=async(req,res)=>{
    const id=req.params.id
    const user=await HisotryModel.find({empid:id})
    return res.json({ Status: true, Result: user });
}

    
const empHistoryDelete =async(req,res)=>{
    const id=req.params.id
    const user=await HisotryModel.deleteOne({_id:id})
    return res.json({ Status: true, Result: user });
    }

    const empModuleStatus = async (req, res) => {
        try {
            const { employeeId, moduleId } = req.body;
            const completedModule = new empModule({ employeeId, moduleId });
            await completedModule.save();
            res.json({ success: true, completedModule });
          } catch (error) {
            console.error('Error marking module as completed:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
          }
    };
    const incompleteModule= async (req, res) => {
        try {
          const employeeId = req.params.employeeId;
          const completedModules = await empModule.find({ employeeId }).select('moduleId');
          const completedModuleIds = completedModules.map(module => module.moduleId);
      
          const incompleteModules = await TrainingModule.find({
            _id: { $nin: completedModuleIds },
          });
      
          res.json(incompleteModules);
        } catch (error) {
          console.error('Error fetching incomplete modules:', error);
          res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
        }
      };
    const getempModule = async (req, res) => {
        try {
        const employeeId = req.params.employeeId;
        const completedModules = await empModule.find({ employeeId }).populate('moduleId');
        res.json(completedModules);
      } catch (error) {
        console.error('Error fetching completed modules:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
      }
    };
    
module.exports = {
    emplogin,
    empdetail,
    leaveReq,
    leavereqEmp,
    leaveWithdrawEmp,
    empHistory,
    getempHistory,
    empHistoryDelete,
    getempModule,
    empModuleStatus,
    incompleteModule
}