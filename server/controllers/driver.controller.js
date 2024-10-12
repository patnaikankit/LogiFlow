import { bookingModel } from '../models/booking.model.js';

export const fetchNewBookings = async (req, res) => {
    try {
        const newBookings = await bookingModel.find({ deliveryStatus: 'pending' }).limit(1); 
        if (newBookings.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No new bookings at the moment",
            });
        }

        res.status(200).json({
            success: true,
            booking: newBookings[0], 
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

export const acceptBooking = async (req, res) => {
    const { bookingID } = req.params;

    try {
        const booking = await bookingModel.findById(bookingID);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }

        booking.deliveryStatus = 'accepted';
        await booking.save();

        res.status(200).json({
            success: true,
            message: 'Booking accepted',
            booking,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
};

