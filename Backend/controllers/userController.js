import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModels.js";
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import razorpay from 'razorpay'
import dotenv from 'dotenv';

dotenv.config();

const registerUser = async (req, res) => {
    
  try {
    const { name, email, password } = req.body;
    if (!name || !password || !email) {
      return res.json({ success: false, message: "Missing Details" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong email" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Api for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "invalid cridentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//Api for user profile data

const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
    try {
      const { userId, name, phone, address, dob, gender } = req.body;
      const imageFile = req.file;
  
      if (!userId || !name || !phone || !dob || !gender) {
        return res.json({ success: false, message: "Data Missing" });
      }
  
      let parsedAddress;
      try {
        parsedAddress = address ? JSON.parse(address) : {};
      } catch (error) {
        return res.json({ success: false, message: "Invalid address format" });
      }
  
      await userModel.findOneAndUpdate(
        { _id: userId },
        { name, phone, address: parsedAddress, dob, gender }
      );
  
      if (imageFile) {
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: 'image' });
        const imageURL = imageUpload.secure_url;
  
        await userModel.findOneAndUpdate({ _id: userId }, { image: imageURL });
      }
  
      res.json({ success: true, message: "Profile updated" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  const bookAppointment=async(req,res)=>{
    try {
        const {userId, docId, slotDate, slotTime}=req.body

        const docData=await doctorModel.findById(docId).select('-password')
        if(!docData.available){
            return res.json({success:false,message:'Doctor not available'})
        }
        let slots_booked=docData.slots_booked
        //checking for slots availability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false,message:'Doctor not available'}) 
            }else{
                slots_booked[slotDate].push(slotTime)
            }
        }else{
            slots_booked[slotDate]=[]
            slots_booked[slotDate].push(slotTime)
        }

        const userData=await userModel.findById(userId).select('-password')
        delete docData.slots_booked //bcz dont want to save this thing in appointmentdata 
        const appointmentData={
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date:Date.now()

        }
        const newAppointment=new appointmentModel(appointmentData)
        await newAppointment.save()

        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:'Appointment Booked'})

    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  }
  // api to get user appointments for my-appointment page
  const listAppointment=async(req,res)=>{
    try {
        const {userId}=req.body
        const appointments=await appointmentModel.find({userId})
        res.json({success:true,appointments})
        
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
  }
  
  //api to cancel appointment
  const cancelAppointment=async(req,res)=>{
    try {
        const {userId,appointmentId}=req.body
        const appointmentData=await appointmentModel.findById(appointmentId)

        // verify appointment user
        if(appointmentData.userId !==userId){
            return res.json({success:false,message:'unauthorised action'})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
        // releasing doctors slot
        const {docId , slotDate, slotTime}=appointmentData
        const doctorData=await doctorModel.findById(docId)
        let slots_booked=doctorData.slots_booked
        slots_booked[slotDate]=slots_booked[slotDate].filter(e=> e!==slotTime)
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})
        res.json({success:true,message:'Appointment cancelled'})

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
  }

  // api to do payment using razorpay

 
  const razorpayInstance=new razorpay({
    
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  })
  const paymentRazorpay = async (req, res) => {
    try {
      const { appointmentId } = req.body;
      const appointmentData = await appointmentModel.findById(appointmentId);
      if (!appointmentData || appointmentData.cancelled) {
        return res.json({ success: false, message: "Appointment cancelled" });
      }
      // creating options for razorpay payment
      const options = {
        amount: appointmentData.amount * 100,
        currency: process.env.currency,
        receipt: appointmentId
      };
      // order creation
      const order = await razorpayInstance.orders.create(options);
      res.json({ success: true, order: order });
    } catch (error) {
      console.error(error);
      res.json({ success: false, message: error.message });
    }
  };
  
//API to verify payment 
const verifyRazorpay=async(req,res)=>{
  try {
    const {razorpay_order_id}=req.body
    const orderInfo=await razorpayInstance.orders.fetch(razorpay_order_id)
    
    if(orderInfo.status='paid'){
      await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      res.json({success:'true',message:'Payment Successful'})
    }else{
      res.json({success:'true',message:'Payment Failed'})
    }
  } catch (error) {
    console.error(error);
      res.json({ success: false, message: error.message });
  }
}
export { registerUser, loginUser, getProfile,updateProfile ,bookAppointment,listAppointment,cancelAppointment,paymentRazorpay,verifyRazorpay};
