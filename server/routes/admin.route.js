import express from "express"
import { getFleetStatus, loginAdmin } from "../controllers/admin.controller.js"
import { validateAdminToken } from "../middlewares/auth.middleware.js"

const router = express.Router()

router.post("/login", loginAdmin)
router.get("/fleet-status", validateAdminToken, getFleetStatus)
// router.get("/vehicle-detail/:vehicleID", validateAdminToken, getVehicleDetails)
// router.post("/add-vehicle", validateAdminToken, addVehicle)

export default router