import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { db } from '../config/firebase.js';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth.js';
import { UpdateProfileRequest } from '../types/user.js';

const router = Router();

// All user routes require authentication
router.use(authenticateToken);

/**
 * GET /api/users/profile
 * Get current user profile
 */
router.get('/profile', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const userDoc = await db.collection('users').doc(req.user.uid).get();

    if (!userDoc.exists) {
      res.status(404).json({ error: 'User profile not found' });
      return;
    }

    const userData = userDoc.data();

    res.status(200).json({
      user: {
        id: userDoc.id,
        ...userData,
      },
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

/**
 * PUT /api/users/profile
 * Update current user profile
 */
router.put(
  '/profile',
  [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('goal').optional().isIn(['lose', 'gain', 'maintain']).withMessage('Invalid goal'),
    body('dailyCalorieTarget').optional().isInt({ min: 0 }).withMessage('Invalid calorie target'),
    body('weight').optional().isFloat({ min: 0 }).withMessage('Invalid weight'),
    body('height').optional().isFloat({ min: 0 }).withMessage('Invalid height'),
  ],
  async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      if (!req.user) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const updates: UpdateProfileRequest & { updatedAt: Date } = {
        ...req.body,
        updatedAt: new Date(),
      };

      await db.collection('users').doc(req.user.uid).update(updates);

      const updatedDoc = await db.collection('users').doc(req.user.uid).get();
      const userData = updatedDoc.data();

      res.status(200).json({
        message: 'Profile updated successfully',
        user: {
          id: updatedDoc.id,
          ...userData,
        },
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Failed to update user profile' });
    }
  }
);

/**
 * DELETE /api/users/profile
 * Delete current user account
 */
router.delete('/profile', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Delete user data from Firestore
    await db.collection('users').doc(req.user.uid).delete();

    // Delete user from Firebase Auth
    const { auth } = await import('../config/firebase.js');
    await auth.deleteUser(req.user.uid);

    res.status(200).json({ message: 'User account deleted successfully' });
  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({ error: 'Failed to delete user account' });
  }
});

/**
 * GET /api/users/stats
 * Get user nutrition statistics (placeholder for future implementation)
 */
router.get('/stats', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // Placeholder for statistics
    // In the future, this could fetch meal history, nutrition data, etc.
    res.status(200).json({
      message: 'Stats endpoint - to be implemented',
      userId: req.user.uid,
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({ error: 'Failed to fetch user stats' });
  }
});

export default router;
