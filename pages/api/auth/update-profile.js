// pages/api/auth/update-profile.js
import { dbConnect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./[...nextauth]";
import mongoose from "mongoose";

// User schema - adjust this to match your existing User model
const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password_hash: String,
  location: String,
  description: String,
  profile_image_url: String,
  role: String,
  stats: Object,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("Starting update profile request...");
    
    // Get session from NextAuth
    const session = await getServerSession(req, res, authOptions);
    
    console.log("Session:", session ? "Session found" : "No session");
    
    if (!session || !session.user) {
      console.log("No valid session found");
      return res.status(401).json({ error: "Not authenticated" });
    }

    const userId = req.body.userId || session.user.id;
    console.log("User ID:", userId);

    if (!userId) {
      console.log("No user ID provided");
      return res.status(400).json({ error: "User ID is required" });
    }

    // Connect to database
    await dbConnect();
    console.log("Database connected");

    // Get current user data
    const currentUser = await User.findById(userId);
    console.log("Current user found:", currentUser ? "Yes" : "No");
    
    if (!currentUser) {
      console.log("User not found with ID:", userId);
      return res.status(404).json({ error: "User not found" });
    }

    // Extract and validate the update data
    const { 
      first_name, 
      last_name, 
      location, 
      description, 
      profile_image_url 
    } = req.body;

    console.log("Update data received:", { 
      first_name, 
      last_name, 
      location, 
      description, 
      profile_image_url: profile_image_url ? "URL provided" : "No URL" 
    });

    // Validate required fields
    if (!first_name || !last_name || !location) {
      return res.status(400).json({ 
        error: "First name, last name, and location are required" 
      });
    }

    // Validate field lengths
    if (first_name.length > 50 || last_name.length > 50) {
      return res.status(400).json({ 
        error: "First name and last name must be less than 50 characters" 
      });
    }

    if (location.length > 100) {
      return res.status(400).json({ 
        error: "Location must be less than 100 characters" 
      });
    }

    if (description && description.length > 500) {
      return res.status(400).json({ 
        error: "Description must be less than 500 characters" 
      });
    }

    // Validate profile image URL if provided
    if (profile_image_url && !profile_image_url.startsWith('http')) {
      return res.status(400).json({ 
        error: "Profile image URL must be a valid HTTP/HTTPS URL" 
      });
    }

    // Prepare update data
    const updateData = {
      first_name: first_name.trim(),
      last_name: last_name.trim(),
      location: location.trim(),
      description: description ? description.trim() : "",
      updated_at: new Date()
    };

    // Only update profile_image_url if it's provided
    if (profile_image_url) {
      updateData.profile_image_url = profile_image_url;
    }

    console.log("Updating user with data:", updateData);

    // Update user in database
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, select: '-password_hash' } // Return updated document, exclude password
    );

    if (!updatedUser) {
      console.log("Failed to update user");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("User updated successfully");

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ 
      error: "Internal server error", 
      message: "Failed to update profile",
      details: error.message 
    });
  }
}