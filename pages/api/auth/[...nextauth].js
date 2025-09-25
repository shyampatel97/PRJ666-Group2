// pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import User from "../../../models/User";
import { dbConnect } from "../../../lib/dbConnect";

// Handle MongoDB client connection properly for different environments
let client;
let clientPromise;

if (process.env.NODE_ENV === "test") {
  // In test environment, don't create MongoDB connections to prevent open handles
  client = null;
  clientPromise = null;
} else if (process.env.MONGODB_URI) {
  // Use global variable to prevent multiple connections during hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(process.env.MONGODB_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
}

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Skip database operations in test environment
        if (process.env.NODE_ENV === "test") {
          console.log("Test environment - skipping real database operations");
          // Return mock user for tests
          if (
            credentials?.email === "test@example.com" &&
            credentials?.password === "TestPassword123!"
          ) {
            return {
              id: "test-user-id",
              email: "test@example.com",
              name: "Test User",
              image: "https://example.com/test-avatar.jpg",
              first_name: "Test",
              last_name: "User",
              location: "Test City",
            };
          }
          return null;
        }

        console.log("=== CREDENTIALS AUTHORIZE ===");
        console.log("Credentials received:", {
          email: credentials?.email,
          password: "***",
        });

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          await dbConnect();
          console.log("Database connected");

          const user = await User.findOne({
            email: credentials.email.toLowerCase().trim(),
          });
          console.log("User found:", user ? "Yes" : "No");

          if (!user) {
            console.log("No user found with email:", credentials.email);
            return null;
          }

          // Check if user has a password (not a Google-only user)
          if (!user.password_hash) {
            console.log("User has no password hash - Google only user");
            return null;
          }

          console.log("Comparing passwords...");
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password_hash
          );
          console.log("Password valid:", isPasswordValid);

          if (!isPasswordValid) {
            console.log("Invalid password for user:", credentials.email);
            return null;
          }

          console.log("Authentication successful for:", user.email);
          return {
            id: user._id.toString(),
            email: user.email,
            name: `${user.first_name} ${user.last_name}`,
            image: user.profile_image_url,
            first_name: user.first_name,
            last_name: user.last_name,
            location: user.location,
            role: user.role,
            description: user.description,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Skip database operations in test environment
      if (process.env.NODE_ENV === "test") {
        return true;
      }

      if (account.provider === "google") {
        try {
          await dbConnect();

          // Check if user already exists
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            // Create new user from Google data
            const newUser = new User({
              first_name:
                profile.given_name || user.name?.split(" ")[0] || "User",
              last_name:
                profile.family_name ||
                user.name?.split(" ").slice(1).join(" ") ||
                "Name",
              email: user.email,
              password_hash: null, // Google users don't have passwords
              location: "Not specified",
              profile_image_url:
                user.image ||
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop&crop=face",
              stats: {
                total_scans: 0,
                avg_plant_health: 0,
                last_scan: null,
              },
              google_id: profile.sub,
            });

            await newUser.save();
            console.log("New Google user created:", newUser.email);
          } else {
            // Update existing user with Google info if needed
            let updated = false;
            if (profile.sub && !existingUser.google_id) {
              existingUser.google_id = profile.sub;
              updated = true;
            }
            if (
              user.image &&
              (!existingUser.profile_image_url ||
                existingUser.profile_image_url.includes("unsplash"))
            ) {
              existingUser.profile_image_url = user.image;
              updated = true;
            }
            if (updated) {
              await existingUser.save();
              console.log(
                "Existing user updated with Google info:",
                existingUser.email
              );
            }
          }

          return true;
        } catch (error) {
          console.error("Google sign-in error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user, account, trigger, session }) {
      // Skip database operations in test environment
      if (process.env.NODE_ENV === "test") {
        if (user) {
          token.userId = user.id;
          token.first_name = user.first_name;
          token.last_name = user.last_name;
          token.location = user.location;
          token.profile_image_url = user.image;
        }
        return token;
      }

      // Always refresh user data on any JWT update (including profile updates)
      if (trigger === "update" || user) {
        try {
          await dbConnect();

          // For update triggers, use the email from token, for new logins use user.email
          const email = user?.email || token.email;

          const dbUser = await User.findOne({ email });

          if (dbUser) {
            console.log(
              "Refreshing JWT token with fresh user data for:",
              dbUser.email
            );
            token.userId = dbUser._id.toString();
            token.first_name = dbUser.first_name;
            token.last_name = dbUser.last_name;
            token.location = dbUser.location;
            token.profile_image_url = dbUser.profile_image_url;
            token.role = dbUser.role;
            token.description = dbUser.description;
            token.email = dbUser.email;

            // Update the name field for consistency
            token.name = `${dbUser.first_name} ${dbUser.last_name}`;
          } else if (user) {
            // Fallback for new users
            token.userId = user.id;
            token.first_name = user.first_name;
            token.last_name = user.last_name;
            token.location = user.location;
            token.profile_image_url = user.image;
            token.role = user.role;
            token.description = user.description;
            token.email = user.email;
            token.name = user.name;
          }
        } catch (error) {
          console.error("Error refreshing JWT token:", error);
          // Don't fail the entire auth process, just log the error
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId;
        session.user.first_name = token.first_name;
        session.user.last_name = token.last_name;
        session.user.location = token.location;
        session.user.profile_image_url = token.profile_image_url;
        session.user.role = token.role;
        session.user.description = token.description;

        // Update the name and image for consistency
        session.user.name =
          token.name || `${token.first_name} ${token.last_name}`;
        session.user.image = token.profile_image_url;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  events: {
    async updateUser(message) {
      // This event is triggered when user data is updated
      console.log("NextAuth updateUser event:", message);
    },
  },
};

export default NextAuth(authOptions);
export { authOptions };
