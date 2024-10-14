import { bookingModel } from "../models/booking.model.js"
import { userModel } from "../models/user.model.js"
import { calculatePrice } from "../services/price.service.js"
import { generateToken } from "../utils/auth.util.js" 
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

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

        const accessTokenExp = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
        const accessToken = generateToken({ email }, accessTokenExp);

        const newUser = new userModel({ 
            name, 
            email, 
            phone, 
            password: hashedPassword,
            tokens: {
                accessToken: {
                    token: accessToken,
                    expireAt: new Date(accessTokenExp * 1000)
                }
            }
        });

        const savedUser = await newUser.save();

        res.status(201).json({
            success: true,
            message: "New Student User Successfully!",
            data: savedUser
        });
    } 
    catch (err) {
        res.status(500).json({ 
            success: false,
            error: err.message 
        });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "All Fields are Required!",
      });
      return;
    }
  
    try {
      const user = await userModel.findOne({ email });
  
      if (!user) {
        res.status(422).json({
          success: false,
          message: "Invalid email!",
        });
        return;
      }
  
      const passwordCheck = await bcrypt.compare(password, user.password);
  
      if (!passwordCheck) {
        res.status(422).json({
          success: false,
          message: "User Credentials don't match!",
        });
        return;
      }
  
      const accessTokenExp = Date.now() / 1000 + 24 * 60 * 60;
      const accessToken = generateToken({ email: user.email }, accessTokenExp);
  
      user.tokens.accessToken = {
        token: accessToken,
        expireAt: new Date(accessTokenExp * 1000),
      };
  
      const savedUser = await user.save();
  
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

export const createBooking = async (req, res) => {
    const { userID } = req.params;
    const { pickupLocation, dropOffLocation, vehicleType } = req.body;
  
    if (!pickupLocation || !dropOffLocation || !vehicleType) {
      res.status(400).json({
        success: false,
        message: "All Fields are Required!",
      });
      return;
    }
  
    const estimatedCost = calculatePrice(pickupLocation, dropOffLocation, vehicleType);
  
    const booking = new bookingModel({
      pickupLocation,
      dropOffLocation,
      vehicleType,
      estimatedCost,
      userID,
      bookingStatus: 'confirmed',
    });
  
    try {
        const user = await userModel.findById(userID);
            if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

      const savedBooking = await booking.save();
  
      user.bookings.push(savedBooking._id); 
      await user.save();  
  
      res.status(201).json({
        success: true,
        savedBooking,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err.message,
      });
    }
};

export const trackvehicle = async (req, res) => {
  const { userID, bookingID } = req.params;  

  if (!userID || !bookingID) {
    return res.status(400).json({
      success: false,
      message: "User ID and Booking ID are required"
    });
  }

  try {
    io.on('connection', (socket) => {
      console.log(`User connected: ${socket.id}`);

      socket.on('userConnect', (userID) => {
        userSockets[userID] = socket;
        console.log(`User ${userID} connected`);
      });

      socket.on('driverConnect', (driverID) => {
        driverSockets[driverID] = socket;
        console.log(`Driver ${driverID} connected`);
      });

      socket.on('locationUpdate', (driverID, location) => {
        if (driverSockets[driverID]) {
          const userSocket = userSockets[userID];
          if (userSocket) {
            userSocket.emit('driverLocation', {
              bookingID,
              location
            });
            console.log(`Sent driver location to user ${userID}`);
          }
        }
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });

    res.status(200).json({
      success: true,
      message: `Tracking started for booking ${bookingID}`
    });
  }
  catch(err){
    res.status(500).json({
      success: false,
      message: `Error tracking vehicle: ${err.message}`
    });
  }
};

export const checkUserToken = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is required' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) {
      return res.status(401).json({ message: 'Access token is required' });
  }

  try {
      const user = await userModel.findOne({ 'tokens.accessToken.token': token });

      if(!user){
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
                  user: {
                      id: user._id,
                      name: user.name,
                      email: user.email,
                  }
              });
          }
      });
  } 
  catch (error){
      console.error('Error finding user:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};
