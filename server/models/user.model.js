import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  phone: { 
    type: String,
    required: true ,
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
  bookings: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Booking' }],  
  createdAt: { 
    type: Date, 
    default: Date.now 
    }
}, { timestamps: true });

export const userModel =  mongoose.model('User', userSchema);
