import { Request, Response, NextFunction } from 'express';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Simulate validation
  if (token !== 'VALID_TOKEN') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};
