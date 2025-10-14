import { NextFunction } from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'info_u_user_token';
const JWT_EXPIRES_IN = 86400;

export const config = {
  jwtSecret: JWT_SECRET,
  jwtExpiresIn: JWT_EXPIRES_IN,
  port: parseInt(process.env.PORT || '3000', 10),
};


export const generateToken = (payload: string | object | Buffer): string => {
  const options: SignOptions = {
    expiresIn: config.jwtExpiresIn, // This is valid: string like '24h' or number like 86400
  };
  return jwt.sign(payload, config.jwtSecret, options);
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};



export const authenticate = (
  req: any,
  res: any,
  next: NextFunction
): void => {
  let token: string | undefined;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Attach user to request
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};