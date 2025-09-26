const express = require('express')

const router = express.Router()

const { createUser, loginUser, updatePassword } = require('./userController')
const verifyToken = require("../authMiddleware")

// if we add functions before (req,res) as parameters, they will run before we check this specific route (another way to add middleware)
// in this case, our verifyToken runs as middleware that checks our token
router.get("/protected", verifyToken, (req,res) => {
    try {
        // set it up so user gets whatever data back that you want to send
        res.status(200).json({
            message: "success",
            payload: "Token verified!"
        })
    } catch (error) {
        res.status(401).json({
            message: "failure",
            payload: error
        })
    }
})

router.post('/', async (req, res) => {
  try {
    const newUser = await createUser(req.body)
    res.json({
      message: 'success',
      payload: newUser
    })
  } catch (error) {
    res.status(500).json({
      message: 'failure',
      payload: error.message
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const loginToken = await loginUser(req.body)

    // if (loginResult) {
    //   res.json({
    //     message: 'success',
    //     payload: 'Successfully logged in!!!'
    //   })
    // } else {
    //   throw 'Login Failed'
    // }

    res.json({
        message: 'success',
        payload: loginToken
    })
  } catch (error) {
    res.status(500).json({
      message: 'failure',
      payload: error.message
    })
  }
})

router.put('/changepassword', async (req, res) => {
  try {
    const result = await updatePassword(req.body)
    res.status(200).json({
      message: 'success',
      payload: result
    })
  } catch (error) {
    res.status(500).json({
      message: 'failure',
      payload: error
    })
  }
})

module.exports = router
