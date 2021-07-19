//import { v4 as uuidv4 } from 'uuid';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  created: { type: Date, default: Date.now },
  isadmin: { type: Boolean, default: false },
  role: { type: String, default: 'taker' },
  isactive: { type: Boolean, default: true }
});

export interface User extends mongoose.Document {
  fullName: string;
  username: string;
  email: string;
  password: string;
  created: Date;
  isadmin: boolean;
  role: string;
  isactive: boolean;
}
