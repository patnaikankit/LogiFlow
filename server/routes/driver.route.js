import express from "express"
import { acceptBooking, checkDriverToken, fetchNewBookings, loginDriver, registerDriver, statusUpdate } from "../controllers/driver.controller.js"
import { validateDriverToken } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/register", registerDriver)
router.post("/login", loginDriver)
router.get("/new-booking", validateDriverToken,fetchNewBookings)
router.post("/accept-booking/booking/:bookingID/vehicle/:vehicleID", validateDriverToken,acceptBooking);
router.post("/update-booking/booking/:bookingID", validateDriverToken, statusUpdate);
router.get('/check/id/:driverID', validateDriverToken, checkDriverToken)

export default router