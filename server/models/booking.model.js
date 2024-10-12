import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  pickupLocation: {
    type: String,
    require: true
  },
  dropOffLocation: {
    type: String,
    require: true
  },
  vehicleType: {
    type: String,
    require: true
  },
  estimatedCost: Number,
  status: { 
        type: String, 
        default: 'pending' 
    },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  vehicleId: mongoose.Schema.Types.ObjectId,
  createdAt: { 
    type: Date, 
    default: Date.now 
    },
}, { timestamps: true });

export const bookingModel = mongoose.model('Booking', bookingSchema);
