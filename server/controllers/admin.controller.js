import { adminModel } from '../models/admin.model.js';
import { vehicleModel } from '../models/vehicle.model.js';
import bcrypt from "bcrypt"
import { generateToken } from '../utils/auth.util.js';

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
          message: "User Credentials don't match!",
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
        const vehicles = await vehicleModel.find({});
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
        const vehicle = await vehicleModel.findById(vehicleID);
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
      const newVehicle = new vehicleModel({
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
