const User = require('./userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config()

// Get All Users

// Create User

// signs up
// securely store their information in the DB
const createUser = async userData => {
  /* 
        userData = {
            username: "user123",
            password: "their_password"
        }
    */

  try {
    const salt = await bcrypt.genSalt()

    const hashedPassword = await bcrypt.hash(userData.password, salt)

    const secureUserData = {
      username: userData.username,
      password: hashedPassword
    }

    const newUser = await User.create(secureUserData)
    return newUser
  } catch (error) {
    throw error
  }
}

// Login User

const loginUser = async loginData => {
  try {
    // find the username that we're trying to login as
    // .find - returns data as an array
    // .findOne - always returns a single item
    const user = await User.findOne({ username: loginData.username })

    if (!user) {
      throw 'User not found'
    }

    // compare the passwords
    const isCorrectPassword = await bcrypt.compare(
      loginData.password,
      user.password
    )

    if (isCorrectPassword) {
      // generate and return token
      // jwt.sign({payload}, Secret_Key) - creates token and needs a signature
      // payload, Secret_Key for the App
      // payload - typically the user data
      // Secret-Key - an encrypted string we setup in our .env file
      const token = jwt.sign({user}, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h'
      })
      
      return token;
    } else {
      throw 'Login Failed'
    }

    // return isCorrectPassword
  } catch (error) {
    throw error
  }
}

const updatePassword = async userData => {
  try {
    // userData - { username, oldpassword, newpassword }
    // find the user that we are trying to update
    const user = await User.findOne({ username: userData.username })

    if (!user) {
      throw 'User not found'
    }

    // verify old password is correct
    const isCorrectPassword = await bcrypt.compare(
      userData.oldPassword,
      user.password
    )

    if (isCorrectPassword) {
      // update the password
      const salt = await bcrypt.genSalt()
      const newHashedPassword = await bcrypt.hash(userData.newPassword, salt)

      // update the user in the database with the new password
      const updatedUser = {
        username: user.username,
        password: newHashedPassword
      }

      // updateOne({ searchProperty: search }, { $set: newData }) - let's us update based on any property, not just ID
      await User.updateOne({ username: user.username }, { $set: updatedUser })

      return 'Password successfully updated'
    } else {
      throw 'Password Incorrect'
    }
  } catch (error) {
    throw error
  }
}

module.exports = {
  createUser,
  loginUser,
  updatePassword
}
