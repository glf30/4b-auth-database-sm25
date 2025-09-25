const User = require('./userModel')
const bcrypt = require('bcrypt')

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

const loginUser = async (loginData) => {
    try {
        
        // find the username that we're trying to login as
        // .find - returns data as an array
        // .findOne - always returns a single item
        const user = await User.findOne({ username: loginData.username})

        if(!user){
            throw "User not found"
        }

        // compare the passwords
        const isCorrectPassword = await bcrypt.compare(loginData.password, user.password)

        return isCorrectPassword;

    } catch (error) {
        throw error
    }
}

const updatePassword = () => {
  
}

module.exports = {
    createUser,
    loginUser
}