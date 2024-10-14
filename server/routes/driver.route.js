import express from "express"
import { acceptBooking, fetchNewBookings, loginDriver, registerDriver, statusUpdate } from "../controllers/driver.controller.js"

const router = express.Router()


router.post("/register", registerDriver)
router.post("/login", loginDriver)
router.get("/new-booking", fetchNewBookings)
router.post("/accept-booking/booking/:bookingID/vehicle/:vehicleID", acceptBooking);
router.post("/update-booking/booking/:bookingID", statusUpdate);

export default router