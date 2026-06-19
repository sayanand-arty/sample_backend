import User from '../models/userModel.js';
import { verifyJWT } from '../utils/jwt.js';
import ApiError from '../utils/apiError.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new ApiError(401, 'Authentication required');
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyJWT(token);

    if (!decoded?.userId) {
      throw new ApiError(401, 'Invalid credentials');
    }

    const user = await User.findById(decoded.userId).lean();
    if (!user) {
      throw new ApiError(401, 'Invalid credentials');
    }

    delete user.pass;
    req.user = user;
    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      return next(new ApiError(401, 'Invalid credentials'));
    }
    return next(error);
  }
};

export default authMiddleware;
