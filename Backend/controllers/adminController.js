import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import express from 'express';
import appointmentModel from '../models/appointmentModel.js'
import userModel from '../models/userModels.js'
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
//Adding doctor Api
const addDoctor=async(req,res)=>{
try{
 const {name,email,password,speciality,degree,experience,about,fees,address}=req.body
 const imageFile=req.file
 if(!degree ){
   return res.json({success:false,message:'Missing '})
}
 if(!name || !email || !password || !speciality || !degree || !experience || !about || !address || !fees){
    return res.json({success:false,message:'Missing details'})
 }

 if(!validator.isEmail(email)){
    return res.json({success: false, message:'Please enter a valid email'})
 }
 if(password.length<8){
    return res.json({success: false, message:'Please enter a valid password'})
}

// hasing doctor password
const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password,salt)

const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
const imageUrl=imageUpload.secure_url

const doctorData={
    name,
    email,
    image:imageUrl,
    password:hashedPassword,
    speciality,
    degree,
    experience,
    about,
    fees,
    address:JSON.parse(address),
    date:Date.now()
}
const newDoctor= new doctorModel(doctorData)
await newDoctor.save()

res.json({success:true,message:'Doctor Added'})

}

catch(error){
   console.log(error)
    res.json({success:false,message:error.message})
   
}
}
// API for admin login
const loginAdmin = async (req, res) => {
   try {
      console.log("random")
      console.log('Request body:', req.body); // Log the entire request body

     const { email, password } = req.body;
     console.log('Email:', email, 'Password:', password); // Log extracted values

      if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
         const token = jwt.sign(email + password, process.env.JWT_SECRET);
         res.json({ success: true, token });
      } else {
         res.json({ success: false, message: 'Invalid credentials' });
      }
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
   }
};

// api to get all doctors
const allDoctors=async(req,res)=>{
  try {
   const doctors=await doctorModel.find({}).select('-password')  // it will remove password property 
   res.json({success:true,doctors})
  } catch (error) {
   console.log(error);
   res.json({ success: false, message: error.message });
  }
}

//API to get all appointment list
const appointmentsAdmin=async(req,res)=>{
   try {
      const appointments=await appointmentModel.find({})
      res.json({success:true,appointments,appointmentsAdmin})
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
   }
}
//api to get dashboard of adminpanel
const adminDashboard=async(req,res)=>{
   try {
      const doctors=await doctorModel.find({})
      const users=await userModel.find({})
      const appointments=await appointmentModel.find({})

      const dashData={
         doctors:doctors.length,
         appointments:appointments.length,
         patients:users.length,
         latestAppointments:appointments.reverse().slice(0,5)
      }
      res.json({success:true,dashData})
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
   }
}

export{addDoctor , loginAdmin,allDoctors,appointmentsAdmin,adminDashboard}