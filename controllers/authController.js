import ApiError from '../utils/apiError.js';
import { registerUser, loginUser } from '../services/authService.js';
import { sendResponse } from '../utils/apiResponse.js';

export const signup = async (req, res, next) => {
  try {
    const { user, token } = await registerUser(req.body);
    return res.status(201).json(sendResponse(true, 'Account created successfully', { user, token }));
  } catch (error) {
    return next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, token } = await loginUser(req.body);
    return res.status(200).json(sendResponse(true, 'Login successful', { user, token }));
  } catch (error) {
    return next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new ApiError(401, 'Authentication required');
    }

    return res.status(200).json(sendResponse(true, 'Current user details fetched successfully', { user: req.user }));
  } catch (error) {
    return next(error);
  }
};
