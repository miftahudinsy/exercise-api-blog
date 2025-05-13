import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../services/jwt";

interface AuthRequest extends Request {
  author?: {
    id: number;
    email: string;
  };
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    req.author = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

export { AuthRequest, authMiddleware };
