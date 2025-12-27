import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { auth, db } from '../config/firebase.js';
import { AuthRequest, RegisterRequest } from '../types/user.js';

const router = Router();

/**
 * POST /api/auth/register
 * Register a new user with Firebase Auth and create user profile in Firestore
 */
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Name is required'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email, password, name, goal, weight, height }: RegisterRequest = req.body;

      // Create user in Firebase Auth
      const userRecord = await auth.createUser({
        email,
        password,
        displayName: name,
      });

      // Create user profile in Firestore
      const userProfile = {
        id: userRecord.uid,
        name,
        email,
        goal: goal || 'maintain',
        dailyCalorieTarget: 2200,
        weight: weight || null,
        height: height || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.collection('users').doc(userRecord.uid).set(userProfile);

      // Generate custom token for immediate login
      const customToken = await auth.createCustomToken(userRecord.uid);

      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: userRecord.uid,
          name,
          email,
          goal: userProfile.goal,
          dailyCalorieTarget: userProfile.dailyCalorieTarget,
          weight: userProfile.weight,
          height: userProfile.height,
        },
        token: customToken,
      });
    } catch (error: any) {
      console.error('Registration error:', error);
      
      if (error.code === 'auth/email-already-exists') {
        res.status(400).json({ error: 'Email already in use' });
        return;
      }

      res.status(500).json({ error: 'Failed to register user' });
    }
  }
);

/**
 * POST /api/auth/login
 * Verify user credentials and return custom token
 * Note: In a real scenario, the frontend would handle Firebase Auth directly
 * This endpoint is for demonstration and can verify user exists
 */
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req: Request, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { email }: AuthRequest = req.body;

      // Get user by email
      const userRecord = await auth.getUserByEmail(email);
      
      // Get user profile from Firestore
      const userDoc = await db.collection('users').doc(userRecord.uid).get();
      
      if (!userDoc.exists) {
        res.status(404).json({ error: 'User profile not found' });
        return;
      }

      const userData = userDoc.data();

      // Generate custom token
      const customToken = await auth.createCustomToken(userRecord.uid);

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: userRecord.uid,
          name: userData?.name,
          email: userData?.email,
          goal: userData?.goal,
          dailyCalorieTarget: userData?.dailyCalorieTarget,
          weight: userData?.weight,
          height: userData?.height,
        },
        token: customToken,
      });
    } catch (error: any) {
      console.error('Login error:', error);
      
      if (error.code === 'auth/user-not-found') {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      res.status(500).json({ error: 'Failed to login' });
    }
  }
);

/**
 * POST /api/auth/verify-token
 * Verify Firebase ID token
 */
router.post('/verify-token', async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(400).json({ error: 'Token is required' });
      return;
    }

    const decodedToken = await auth.verifyIdToken(token);
    
    // Get user profile
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();
    const userData = userDoc.data();

    res.status(200).json({
      valid: true,
      user: {
        id: decodedToken.uid,
        email: decodedToken.email,
        ...userData,
      },
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ valid: false, error: 'Invalid token' });
  }
});

export default router;
