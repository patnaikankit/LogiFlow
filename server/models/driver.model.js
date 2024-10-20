import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
  vehicleType: { 
    type: String,  
  },
  tokens: {
        accessToken: {
            token: String,
            expireAt: Date
        }
  }, 
  currentLocation: {
    latitude: { 
      type: Number 
    },
    longitude: { 
      type: Number
    },
  },
  status: { 
    type: String, 
    default: 'active' 
  },   
  trips: {
    type: Number
  },
  rating: {
    type: Number
  }
}, { timestamps: true });

export const driverModel = mongoose.model('Driver', driverSchema);
