const express = require("express")
const logger = require("morgan")
const connectToMongoDB = require("./database/connectToMongoDB")

const app = express()

const PORT = 3000;

app.use(express.json())
app.use(logger("dev"))

const userRouter = require("./users/userRouter")
app.use("/users/", userRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on PORT:${PORT}`)
    connectToMongoDB();
})