import express from "express"
import { acceptBooking, fetchNewBookings } from "../controllers/driver.controller.js"

const router = express.Router()


router.get("/new-booking", fetchNewBookings)
router.post("/update-booking/booking/:bookingID/vehicle/:vehicleID", acceptBooking);

export default router