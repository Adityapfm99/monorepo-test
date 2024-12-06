import express, { Request, Response, NextFunction } from "express";
import { fetchUserData, updateUserData } from "../controller/api";

const router = express.Router();

// Correctly structured route handler
router.get(
  "/fetch-user-data",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fetchUserData(req); // Call your controller function
      res.status(200).json(data); // Respond with JSON
    } catch (error) {
      next(error); // Pass errors to Express error handler
    }
  }
);

router.post(
  "/update-user-data",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await updateUserData(req); // Call your controller function
      res.status(200).json(result); // Respond with JSON
    } catch (error) {
      next(error); // Pass errors to Express error handler
    }
  }
);

export default router;
