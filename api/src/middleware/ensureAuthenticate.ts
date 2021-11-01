import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPlayload {
  sub: string;
}

export function ensureAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({
      error: 'Invalid Token',
    });
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPlayload;
    req.user_id = sub;

    return next();
  } catch (error) {
    return res.status(401).json({
      error: 'Expired Token',
    });
  }
}
