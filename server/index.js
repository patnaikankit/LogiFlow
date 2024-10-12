import "dotenv/config"
import express from "express"
import { connectDB } from "./config/db.config.js"
import userRoutes from "./routes/user.route.js"
import driverRoutes from "./routes/driver.route.js"
import adminRoutes from "./routes/admin.route.js"

const app = express()
app.use(express.json())

connectDB()

const PORT = process.env.PORT || 4000

app.get("/", (req, res) => {
    res.send("Server is working!")
})

app.use("/api/user", userRoutes)
app.use("/api/driver", driverRoutes)
app.use("/api/admin", adminRoutes)

app.listen(PORT, (req, res) => {
    console.log(`Server is listening on port ${PORT}`);
})