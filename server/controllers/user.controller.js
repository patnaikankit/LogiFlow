import { bookingModel } from "../models/booking.model.js"
import { userModel } from "../models/user.model.js"
import { calculatePrice } from "../services/price.service.js"
import { } from "../services/tracking.service.js"
import bcrypt from "bcrypt"

export const registerUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password || !phone) {
        return res.status(400).json({
            success: false,
            message: "All Fields are Required!"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ name, email, phone, hashedPassword });
        const savedUser = await newUser.save();
        res.status(201).json({
            success: true,
            message: "New Student Created Successfully!",
            data: savedUser
        });
    } 
    catch (err) {
        res.status(500).json({ 
            success: false,
            error: err.message 
        });
    }
}

export const loginUSer = async (req, res) => {
    const { email, password } = req.body;

    if (!password || !email) {
        res.status(400).json({
            success: false,
            message: "All Fields are Required!"
        });
        return;
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(422).json({
                success: false,
                message: "Invalid email!"
            });
            return;
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            res.status(422).json({
                success: false,
                message: "User Credentials don't match!"
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: "Login Successful!",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}

export const createBooking = async (req, res) => {
    const { pickupLocation, dropOffLocation, vehicleType, userId } = req.body;

    if(!pickupLocation || !dropOffLocation || !vehicleType){
        res.status(400).json({
            success: false,
            message: "All Fields are Required!"
        });
        return;
    }

    const estimatedCost = calculatePrice(pickupLocation, dropOffLocation, vehicleType);

    const booking = new bookingModel({
      pickupLocation,
      dropOffLocation,
      vehicleType,
      estimatedCost,
      userId,
      status: 'confirmed',
    });
  
    try{
      const savedBooking = await booking.save();
        res.status(201).json({
            success: true,
            savedBooking
        });
    } 
    catch(err){
      res.status(500).json({ 
            success: false,
            error: err.message 
        });
    }
};