const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


//creating tokens
const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn : '1d'})
}



//login user
const loginUser = async (req ,res) => {
    const {email , password} = req.body
    try {
        const user = await User.login(email , password)
        const token = generateToken(user._id)
        res.status(200).json({email , token})
    } catch (err) {
        res.status(400).json({error:err.message})
    }
}



//signup user
const signUpUser = async (req ,res) => {

    const {email ,password } = req.body
    try {
        const user = await User.signup(email , password)
        const token = generateToken(user._id)

        res.status(200).json({email , token})
    } catch (err) {
        res.status(400).json({error:err.message})
    }

}


module.exports= {signUpUser , loginUser}