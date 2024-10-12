import express from "express"
import { createBooking, loginUSer, registerUser } from "../controllers/user.controller.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUSer)
router.post("/booking", createBooking)

export default router