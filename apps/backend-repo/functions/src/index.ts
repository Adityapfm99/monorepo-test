import * as functions from "firebase-functions";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import admin from "firebase-admin";
import 'dotenv/config';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL:"https://backend-ebuddy-dd012-default-rtdb.firebaseio.com",
});

const db = admin.database();
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Middleware for logging requests
app.use((req: Request, res: Response, next: NextFunction): void => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// Route: Fetch user
app.get("/user", async (req: Request, res: Response): Promise<void> => {
  const email = req.query.email as string;

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  try {
    const userRef = db.ref("users").child(email.replace(/\./g, ","));
    const snapshot = await userRef.once("value");

    if (!snapshot.exists()) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const { password, ...user } = snapshot.val(); // Exclude password from response
    res.status(200).json({ email, ...user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: Update user
app.post("/user", async (req: Request, res: Response): Promise<void> => {
  const { email, name, age, password } = req.body;

  if (!email || !name || typeof age !== "number" || !password) {
    res.status(400).json({ message: "Invalid request data" });
    return;
  }

  try {
    const userRef = db.ref("users").child(email.replace(/\./g, ","));
    const snapshot = await userRef.once("value");

    if (!snapshot.exists()) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await userRef.update({ name, age, password });
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: Register user
app.post("/register", async (req: Request, res: Response): Promise<void> => {
  const { email, name, age, password } = req.body;

  if (!email || !name || typeof age !== "number" || !password) {
    res.status(400).json({ message: "Invalid request data" });
    return;
  }

  try {
    const userRef = db.ref("users").child(email.replace(/\./g, ","));
    const snapshot = await userRef.once("value");

    if (snapshot.exists()) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    await userRef.set({ name, age, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route: Login user
app.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  try {
    const userRef = db.ref("users").child(email.replace(/\./g, ","));
    const snapshot = await userRef.once("value");

    if (!snapshot.exists()) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const user = snapshot.val();
    if (user.password !== password) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    res.status(200).json({
      message: "Login successful",
      user: { email, name: user.name, age: user.age },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// Export the API
export const api = functions.https.onRequest(app);
