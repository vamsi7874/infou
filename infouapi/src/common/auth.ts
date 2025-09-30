import { NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
const JWT_SECRET="info_u_user_toekn"
const JWT_EXPIRES_IN="24h"

export const config = {
  jwtSecret: process.env.JWT_SECRET || JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || JWT_EXPIRES_IN,
  port: parseInt(process.env.PORT || '3000', 10)
};

export const generateToken = (payload: any): string => {
  const options: any = {
    expiresIn: config.jwtExpiresIn
  };
  return jwt.sign(payload, config.jwtSecret, options);
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, config.jwtSecret) as any;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const authenticate = (
  req: any,
  res: any,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Access token required' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};