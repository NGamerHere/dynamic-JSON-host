// types.ts
import 'express-session';
import type { ObjectId } from 'mongoose';

export interface SessionData {
  user?: {
    _id: string;
    username: string;
    email: string;
  };
}

declare module 'express-session' {
  interface SessionData {
    user?: {
      _id: string;
      username: string;
      email: string; 
    };
  }
}
