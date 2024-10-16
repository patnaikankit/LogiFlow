import { bookingModel } from '../models/booking.model.js';
import { driverModel } from '../models/driver.model.js';
import bcrypt from "bcrypt"
import { generateToken } from '../utils/auth.util.js';
import jwt from "jsonwebtoken"

export const registerDriver = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All Fields are Required!"
        });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const accessTokenExp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
        const accessToken = generateToken({ email }, accessTokenExp);

        const newDriver = new driverModel({ 
            name, 
            email, 
            password: hashedPassword,
            tokens: {
                accessToken: {
                    token: accessToken,
                    expireAt: new Date(accessTokenExp * 1000)
                }
            }
        });

        const savedDriver = await newDriver.save();

        res.status(201).json({
            success: true,
            message: "New Student driver Successfully!",
            data: savedDriver
        });
    } 
    catch (err) {
        res.status(500).json({ 
            success: false,
            error: err.message 
        });
    }
};

export const loginDriver = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "All Fields are Required!",
      });
      return;
    }
  
    try {
      const driver = await driverModel.findOne({ email });
  
      if (!driver) {
        res.status(422).json({
          success: false,
          message: "Invalid email!",
        });
        return;
      }
  
      const passwordCheck = await bcrypt.compare(password, driver.password);
  
      if (!passwordCheck) {
        res.status(422).json({
          success: false,
          message: "driver Credentials don't match!",
        });
        return;
      }
  
      const accessTokenExp = Date.now() / 1000 + 24 * 60 * 60;
      const accessToken = generateToken({ email: driver.email }, accessTokenExp);
  
      driver.tokens.accessToken = {
        token: accessToken,
        expireAt: new Date(accessTokenExp * 1000),
      };
  
      const savedUser = await driver.save();
  
      res.status(200).json({
        success: true,
        message: "Login Successful!",
        data: savedUser,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
};

export const fetchNewBookings = async (req, res) => {
    try {
        const newBookings = await bookingModel.find({ deliveryStatus: 'pending' });
        if (newBookings.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No new bookings at the moment",
            });
        }

        res.status(200).json({
            success: true,
            booking: newBookings[0], 
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

export const acceptBooking = async (req, res) => {
    const { bookingID, vehicleID } = req.params;

    try {
        const booking = await bookingModel.findById(bookingID);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }

        if (booking.deliveryStatus === 'accepted') {
            return res.status(400).json({
                success: false,
                message: 'Booking already accepted',
            });
        }

        const vehicle = await driverModel.findById(vehicleID);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found'
            });
        }

        booking.deliveryStatus = 'accepted';
        booking.vehicleID = vehicleID
        await booking.save();

        vehicle.bookingID = bookingID;
        await vehicle.save();

        res.status(200).json({
            success: true,
            message: 'Booking accepted successfully',
            booking,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

export const statusUpdate = async (req, res) => {
    const { bookingID } = req.params; 

    try {
        const booking = await bookingModel.findById(bookingID);
        
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }
        
        booking.status = req.body.status; 

        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Booking status updated successfully',
            booking,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

export const checkDriverToken = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is required' });
    }
  
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
    if (!token) {
        return res.status(401).json({ message: 'Access token is required' });
    }
  
    try {
        const driver = await driverModel.findOne({ 'tokens.accessToken.token': token });
  
        if(!driver){
            return res.status(401).json({ message: 'Invalid token' });
        }
  
        jwt.verify(token, process.env.PASS_KEY, (err, decoded) => {
            if(err){
                console.error('Token verification error:', err);
                return res.status(401).json({ message: 'Token verification failed' });
            } 
            else{
                return res.status(200).json({
                    message: "Token is valid",
                    driver: {
                        id: driver._id,
                        name: driver.name,
                        email: driver.email,
                    }
                });
            }
        });
    } 
    catch (error){
        console.error('Error finding driver:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
  };