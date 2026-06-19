import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { signToken } from '../utils/jwt.js';
import ApiError from '../utils/apiError.js';

export const registerUser = async ({ name, email, pass }) => {
  const existingUser = await User.findOne({ email }).lean();
  if (existingUser) {
    throw new ApiError(409, 'Email already exists');
  }

  const hashedPassword = await bcrypt.hash(pass, 12);
  const user = await User.create({ name, email, pass: hashedPassword });
  const token = signToken({ userId: user._id.toString() });

  const sanitizedUser = user.toObject();
  delete sanitizedUser.pass;

  return { user: sanitizedUser, token };
};

export const loginUser = async ({ email, pass }) => {
  const user = await User.findOne({ email }).select('+pass');
  if (!user) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const passwordMatches = await bcrypt.compare(pass, user.pass);
  if (!passwordMatches) {
    throw new ApiError(401, 'Invalid credentials');
  }

  const token = signToken({ userId: user._id.toString() });
  const sanitizedUser = user.toObject();
  delete sanitizedUser.pass;

  return { user: sanitizedUser, token };
};
