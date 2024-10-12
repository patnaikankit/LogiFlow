import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const vehicleSchema = new mongoose.Schema({
  vehicleType: { 
    type: String, 
    required: true 
  }, 
  vehicleID: {
    type: String,
    default: uuidv4,
    unique: true
  },
  currentLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  status: { 
    type: String, 
    default: 'available' 
  },  
  driverID: {
    type: String,
    default: uuidv4,
    unique: true
  },       
}, { timestamps: true });

export const vehicleModel = mongoose.model('Vehicle', vehicleSchema);
