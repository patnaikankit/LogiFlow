import express from "express"
import { acceptBooking, checkDriverToken, fetchNewBookings, loginDriver, registerDriver, statusUpdate } from "../controllers/driver.controller.js"

const router = express.Router()


router.post("/register", registerDriver)
router.post("/login", loginDriver)
router.get("/new-booking", fetchNewBookings)
router.post("/accept-booking/booking/:bookingID/vehicle/:vehicleID", acceptBooking);
router.post("/update-booking/booking/:bookingID", statusUpdate);
router.get('/check/id/:driverID', checkDriverToken)

export default router