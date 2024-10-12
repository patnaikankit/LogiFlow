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
    type: Number,
    required: true,
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
  tokens: {
        accessToken: {
            token: String,
            expireAt: Date
        }
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
