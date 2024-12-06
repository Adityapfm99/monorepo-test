import { Router, Request, Response } from 'express';
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://backend-ebuddy-dd012-default-rtdb.firebaseio.com',
  });
}

const db = admin.database();
const router = Router();

// Fetch user by email
router.get('/user', async (req: Request, res: Response): Promise<void> => {
  const email = req.query.email as string;

  if (!email) {
    res.status(400).json({ message: 'Email is required' });
    return;
  }

  try {
    const userRef = db.ref(`users/${email.replace(/\./g, ',')}`);
    const snapshot = await userRef.once('value');

    if (!snapshot.exists()) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const user = snapshot.val();
    res.status(200).json({ email, ...user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update user info
router.post('/user', async (req: Request, res: Response): Promise<void> => {
  const { email, name, age } = req.body;

  if (!email || !name || typeof age !== 'number') {
    res.status(400).json({ message: 'Invalid request data' });
    return;
  }

  try {
    const userRef = db.ref(`users/${email.replace(/\./g, ',')}`);
    const snapshot = await userRef.once('value');

    if (!snapshot.exists()) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await userRef.update({ name, age });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Register user
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { email, name, age, password } = req.body;

  console.log('Request Body:', req.body); // Log the request body for debugging

  if (!email || !name || typeof age !== 'number' || !password) {
    res.status(400).json({
      message: 'Invalid request data',
      details: {
        email: email ? 'valid' : 'missing',
        name: name ? 'valid' : 'missing',
        age: typeof age === 'number' ? 'valid' : 'invalid',
        password: password ? 'valid' : 'missing',
      },
    });
    return;
  }

  try {
    const userRef = db.ref(`users/${email.replace(/\./g, ',')}`);
    const snapshot = await userRef.once('value');

    if (snapshot.exists()) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    await userRef.set({ name, age, password });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
