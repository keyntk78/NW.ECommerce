const User = require('../models/user')

const asyncHandler = require('express-async-handler')

const register = asyncHandler(async (req, res) => {
  const { email, password, fistName, lastName } = req.body
  if (!email || !password || !fistName || !lastName) {
    return res.status(400).json({
      success: false,
      message: 'Missing inputs',
    })
  }

  const user = await User.findOne({ email })
  if (user) {
    throw new Error(`User has existed`)
  } else {
    const newUser = await User.create(req.body)
    return res.status(200).json({
      success: newUser ? true : false,
      message: newUser
        ? 'Regiester is successfully. Please go login.'
        : 'Something went wrong',
    })
  }
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Missing inputs',
    })
  }

  const user = await User.findOne({ email })
  if (user && (await user.checkPassword(password))) {
    const { password, role, ...data } = user.toObject()
    return res.status(200).json({
      success: true,
      message: 'Login successfully',
      data,
    })
  } else {
    throw new Error('Invalid email or password')
  }
})

module.exports = {
  register,
  login,
}
