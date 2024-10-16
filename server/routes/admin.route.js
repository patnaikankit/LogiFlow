import express from "express"
import { checkAdminToken, getFleetStatus, loginAdmin } from "../controllers/admin.controller.js"
import { validateAdminToken } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/login", loginAdmin)
router.get("/fleet-status", validateAdminToken, getFleetStatus)
router.get('/check/id/:userID', checkAdminToken)

export default router