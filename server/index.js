const express= require("express")
const dotenv= require("dotenv").config()
const cors= require("cors")
const {mongoose} =require('mongoose')
const cookieParser= require('cookie-parser')
const { urlencoded } = require("body-parser")
const jwt = require('jsonwebtoken');

mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Datebase Connnected."))
    .catch((err)=>console.log("Some Error While connecting",err))


const app = express();
//middleware
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(express.static('Public'))

app.use(cors({
    methods: ['GET', 'POST', 'PUT', "DELETE"],
    credentials: true,
    origin: "http://localhost:5173", // Update with your frontend URL
}));


app.use('/',require('./routes/authRoutes'))
app.use('/',require('./routes/empRoutes'))

const verifyuser = (req,res,next)=>{
    const token=req.cookies.token;
    if(token){
        jwt.verify(token,process.env.JWT_SECRET, (error,decoded)=>{
            if(error) return res.json({Status:false,Error:"Wrong Token"})
            req.id = decoded.id;
            req.role = decoded.role;
            next()
        })
    } else{
        res.json({Status:false,Error:"Not Authenticated"})
    }
}
app.get('/verify',verifyuser,(req,res)=>{
    return res.json({Status:true, role:req.role, id:req.id})
})
app.listen(8000,()=>{
    console.log("Listening at port 8000")
})
