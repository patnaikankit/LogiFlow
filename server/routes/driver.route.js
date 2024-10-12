import express from "express"
import { acceptBooking, fetchNewBookings } from "../controllers/driver.controller.js"

const router = express.Router()


router.get("/new-booking", fetchNewBookings)
router.post("/update-booking/:bookingID", acceptBooking)

export default router