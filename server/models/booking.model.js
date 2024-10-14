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
    bookingStatus: { 
          type: String, 
          default: 'pending' 
    },
    deliveryStatus: { 
      type: String, 
      default: 'pending' 
    },
    status: {
      type: String
    },
    userID: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    vehicleID:{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Vehicle', 
      default: null
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
}, { timestamps: true });

export const bookingModel = mongoose.model('Booking', bookingSchema);
