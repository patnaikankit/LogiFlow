import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  vehicleType: { 
    type: String, 
    required: true 
  }, 
  currentLocation: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  status: { 
    type: String, 
    default: 'available' 
  },  
  driverId: mongoose.Schema.Types.ObjectId,       
}, { timestamps: true });

export const vehicleModel = mongoose.model('Vehicle', vehicleSchema);
