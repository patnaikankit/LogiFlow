import express from "express"
import { createBooking, fetchMyBookings, loginUser, registerUser, trackvehicle } from "../controllers/user.controller.js"
import { validateUserToken } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/booking/:userID", validateUserToken, createBooking)
router.get('/check-status/booking/:bookingID', validateUserToken, trackvehicle)
router.get('/fetch-bookings/user/:userID', validateUserToken, fetchMyBookings);

export default router