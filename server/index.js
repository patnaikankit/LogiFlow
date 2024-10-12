import "dotenv/config"
import express from "express"
import { connectDB } from "./config/db.config.js"
import userRoutes from "./routes/user.route.js"

const app = express()
app.use(express.json())

connectDB()

const PORT = process.env.PORT || 4000

app.get("/", (req, res) => {
    res.send("Server is working!")
})

app.use("/api/user", userRoutes)

app.listen(PORT, (req, res) => {
    console.log(`Server is listening on port ${PORT}`);
})