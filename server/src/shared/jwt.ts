import * as JWT from 'jsonwebtoken';
import config from '../config';

export const JWT_EXPIRY = {
    expiresIn: '2d',
};

export default function generateToken(data: string): string {
  try {
    const token = JWT.sign({ data }, config.JWT_SECRET, JWT_EXPIRY);
    return token;
  } catch (error) {
    throw {
      statusCode: 500,
      message: 'Token generation failed',
    };
  }
}

export function verifyToken(token: string) {
  try {
    const data = JWT.verify(token, config.JWT_SECRET) as string;
    return data as unknown as {
      data: string;
    };
  } catch (error) {
    throw {
      statusCode: 402,
      message: 'Invalid Token'
    };
  }
}
