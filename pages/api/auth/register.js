// pages/api/auth/register.js
const bcrypt = require("bcryptjs")
const User = require("../../../models/User").default || require("../../../models/User")
const { dbConnect } = require("../../../lib/dbConnect")

// Enhanced password validation function
function validatePassword(password) {
  const requirements = {
    minLength: password.length >= 6,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
  
  const isValid = Object.values(requirements).every(Boolean);
  const missingRequirements = Object.entries(requirements)
    .filter(([key, valid]) => !valid)
    .map(([key]) => {
      switch(key) {
        case 'minLength': return 'at least 6 characters';
        case 'hasUppercase': return 'one uppercase letter';
        case 'hasLowercase': return 'one lowercase letter';
        case 'hasNumber': return 'one number';
        case 'hasSpecialChar': return 'one special character';
        default: return key;
      }
    });
  
  return { isValid, missingRequirements };
}

// Add the missing validateRegistrationData function
function validateRegistrationData(data) {
  const errors = []

  if (!data.first_name) errors.push('First name is required')
  if (!data.last_name) errors.push('Last name is required')
  if (!data.email) errors.push('Email is required')
  if (!data.password) errors.push('Password is required')

  if (data.password && data.confirm_password && data.password !== data.confirm_password) {
    errors.push('Passwords do not match')
  }

  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Invalid email format')
  }

  if (data.password) {
    const passwordValidation = validatePassword(data.password)
    if (!passwordValidation.isValid) {
      errors.push(`Password must contain: ${passwordValidation.missingRequirements.join(', ')}`)
    }
  }

  return { isValid: errors.length === 0, errors }
}

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {
    const { 
      first_name, 
      last_name, 
      email, 
      password, 
      confirm_password,
      location,
      profile_image_url 
    } = req.body

    // Basic validation
    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ error: "First name, last name, email, and password are required" })
    }

    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match" })
    }

    // Enhanced password validation
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return res.status(400).json({ 
        error: `Password must contain: ${passwordValidation.missingRequirements.join(', ')}`
      });
    }

    await dbConnect()

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = new User({
      first_name,
      last_name,
      email,
      password_hash: hashedPassword,
      location: location || "Not specified",
      profile_image_url: profile_image_url || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face",
      stats: {
        total_scans: 0,
        avg_plant_health: 0,
        last_scan: null
      }
    })

    await user.save()

    // Return success without sensitive data
    res.status(201).json({ 
      message: "Registration successful! Please sign in with your credentials.",
      user: {
        id: user._id.toString(),
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        location: user.location,
        profile_image_url: user.profile_image_url
      }
    })

  } catch (error) {
    console.error("Registration error:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

module.exports = handler
module.exports.validatePassword = validatePassword
module.exports.validateRegistrationData = validateRegistrationData