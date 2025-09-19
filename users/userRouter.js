const express = require("express")

const router = express.Router();

const { createUser, loginUser } = require("./userController")

router.post("/", async (req,res) => {
    try {
        const newUser = await createUser(req.body)
        res.json({
            message: "success",
            payload: newUser
        })
    } catch (error) {
        res.status(500).json({
            message: "failure",
            payload: error.message
        })
    }
})

router.post("/login", async (req,res) => {
    try {
        const loginResult = await loginUser(req.body);

        if(loginResult) {
            res.json({
                message: "success",
                payload: "Successfully logged in!!!"
            })
        } else {
            throw "Login Failed"
        }
    } catch (error) {
        res.status(500).json({
            message: "failure",
            payload: error
        })
    }
})

module.exports = router;