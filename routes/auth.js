const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
// Sign Up
router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const hashpassword = bcrypt.hashSync(password, 10);

    // Check if user already exists (by email or username)
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User with same email or username already exists' });
    }

    const user = new User({ email, username, password: hashpassword});
    await user.save();
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Login
router.post('/signin', async (req, res) => {
    try{
        const user = await User.findOne({ email: req.body.email });
        if(!user){
            return res.status(400).json({ message: 'User not found' });
        }
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({ message: 'Invalid password' });
        }
        const {password, ...other} = user._doc;
        res.status(200).json({ ...other });
    }catch(err){
        res.status(500).json({ message: err.message });
    }
});
module.exports = router;
