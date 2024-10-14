import express from "express"
import { checkUserToken, createBooking, loginUser, registerUser } from "../controllers/user.controller.js"
import { validateUserToken } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/booking/:userID", validateUserToken, createBooking)

export default router