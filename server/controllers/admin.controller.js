import { adminModel } from '../models/admin.model.js';
import { driverModel } from '../models/driver.model.js';
import bcrypt from "bcrypt"
import { generateToken } from '../utils/auth.util.js';
import jwt from "jsonwebtoken"

export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "All Fields are Required!",
      });
      return;
    }
  
    try {
      const admin = await adminModel.findOne({ email });
  
      if (!admin) {
        res.status(422).json({
          success: false,
          message: "Invalid email!",
        });
        return;
      }
  
      const passwordCheck = await bcrypt.compare(password, admin.password);
  
      if (!passwordCheck) {
        res.status(422).json({
          success: false,
          message: "Admin Credentials don't match!",
        });
        return;
      }
  
      const accessTokenExp = Date.now() / 1000 + 24 * 60 * 60;
      const accessToken = generateToken({ email: admin.email }, accessTokenExp);
  
      admin.tokens.accessToken = {
        token: accessToken,
        expireAt: new Date(accessTokenExp * 1000),
      };
  
      const savedUser = await admin.save();
  
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

export const getFleetStatus = async (req, res) => {
    try {
        const vehicles = await driverModel.find({});
        res.status(200).json({
            success: true,
            vehicles
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

export const getVehicleDetails = async (req, res) => {
    const { vehicleID } = req.params;

    try {
        const vehicle = await driverModel.findById(vehicleID);
        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: 'Vehicle not found',
            });
        }

        res.status(200).json({
            success: true,
            vehicle
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
};

export const addVehicle = async (req, res) => {
    const { vehicleType, latitude, longitude, status } = req.body;
  
    if (!vehicleType || !latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: "All Fields are Required!"
      });
    }
  
    try {
      const newVehicle = new driverModel({
        vehicleType,
        currentLocation: {
          latitude,
          longitude
        },
        status: status || 'available' 
      });
  
      await newVehicle.save();
  
      return res.status(201).json({
        success: true,
        message: `${vehicleType} added successfully!`,
        vehicle: newVehicle
      });
    } 
    catch (err) {
      res.status(500).json({
        success: false,
        error: err.message
      });
    }
};

export const checkAdminToken = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header is required' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) {
      return res.status(401).json({ message: 'Access token is required' });
  }

  try {
      const admin = await adminModel.findOne({ 'tokens.accessToken.token': token });

      if(!admin){
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
                  admin: {
                      id: admin._id,
                      name: admin.name,
                      email: admin.email,
                  }
              });
          }
      });
  } 
  catch (error){
      console.error('Error finding admin:', error);
      return res.status(500).json({ message: 'Internal server error' });
  }
};