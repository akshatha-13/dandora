const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Users } = require('../models'); // Adjust the path according to your project structure
require('dotenv').config()
/**
 * Create a new user with encrypted password
 * @param {Object} req - The request object containing user data in req.body
 * @param {Object} res - The response object
 */
async function createUser(req, res) {
  // Destructure user data from the request body
  const { email, userName, userAddress, userMobileNumber, password, role, profilePictureUrl } = req.body;

  try {
    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create a new user with the hashed password
    const newUser = await Users.create({
      email,
      userName,
      userAddress,
      userMobileNumber,
      password: hashedPassword, // Save the hashed password
      role,
      profilePictureUrl
    });

    // Respond with the created user object
    return res.status(201).json({
        status: 'success',
        message: 'User Created Successfully',
        data: newUser // Include the created user data
      });
  } catch (error) {
    console.error('Error creating user:', error);
    // Respond with an error message
    return res.status(500).json({ message: 'Error creating user', error });
  }
}

async function signIn(req,res){
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await Users.findOne({ where: { email } });

        // Check if user exists and if the password is correct
        if (user && await bcrypt.compare(password, user.password)) {
            // Generate JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
            
            // Respond with token
            res.json({ status: 'success',
            message: 'User fetched Successfully',token:token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
}

module.exports = {
  createUser,
  signIn
};
