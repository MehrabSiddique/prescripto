import validator from 'validator';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import doctorModel from '../models/doctorModel.js'
import {v2 as cloudinary } from 'cloudinary'
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'


const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email" })
    }
    //validating strong password

    if (password.length < 8) {
      return res.json({ success: false, message: "Please enter a strong password" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword
    }



    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      success: true, token
    });

  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and Password are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      })
     return res.json({
        success: true, token
      });
    }

    else {
     return res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error.message);
   return res.json({ success: false, message: error.message });
  }
};

// Check Auth: /api/user/auth
export const isAuth = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    return res.json({ success: true, user });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};


const getProfile = async (req, res) => {
  try {
    const {userId} = req.body;

    const userData = await userModel.findById(userId).select("-password");

    return res.json({ success: true, userData });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {userId,name,address,phone,dob,gender} = req.body;
    const imageFile = req.file

    if (!name || !phone || !gender || !dob) {
      return res.json({ success: false, message: "Missing Data" });
    }
    await userModel.findByIdAndUpdate(userId,{name,address: JSON.parse(address),phone   }).select("-password");

  if (imageFile){
    const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'})
  const imageURL = imageUpload.secure_url

  await userModel.findByIdAndUpdate(userId,{image:imageURL})
  
  
  }

    return res.json({ success: true,message: "profile Updated" });
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    const {userId,docId,slotDate,slotTime } = req.body;
    const docData =  await doctorModel.findById(docId).select("-password");

    if (!docData.available) {
      return res.json({ success: false, message: "doctor not available" });
    }

     slots_booked = docData.slots_booked

  if (slots_booked[slotDate]){
    if (slots_booked[slotDate].includes(slotTime)){
 return res.json({ success: false,message: "slot not available" });
  
    }
    else{
      slots_booked[slotDate].push(slotTime)
    }
  }
  else{
slots_booked [slotDate] = []
slots_booked[slotDate].push(slotTime)
  }

  const userData = await userModel.findById(userId).select('-password')
delete docData.slots_booked


const appointmentData = {
  userId,
  docId,
  userData,
  docData,
  amount:docData.fees,
  slotDate,
  slotTime ,
  date: Date.now ()

}

const newAppointment = new appointmentModel(appointmentData)
 await newAppointment.save()

 //save new slots data
await doctorModel.findById(docId,{slots_booked})
return res.json({ success: true, message: "Appointment booked" });

    
  } catch (error) {
    console.error(error.message);
    return res.json({ success: false, message: error.message });
  }
}

const listAppointment = async (req, res) => {
  try {

    const userId = req.userId;

    const appointments = await appointmentModel.find({userId})

    return res.json({ success: true, appointments });
    
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

const cancelAppointment = async (req, res) => {
  try {

    const {userId, appointmentId} = req.userId;

    const appointmentData = await appointmentModel.findById({appointmentId})

if (appointmentData.userData !==userId){
  return res.json({ success: false, message: "unauthorized action" });
}

await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
   
const {docId, slotDate, slotTime} = appointmentData

const doctorData = await doctorModel.findById(docId)

let slots_booked = doctorData.slots_booked

slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

await doctorModel.findByIdAndUpdate(docId,{slots_booked})

return res.json({ success: true, message : "appointment cancelled" });
    
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};


 

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment,cancelAppointment }