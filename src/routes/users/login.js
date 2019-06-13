import jwt from 'jsonwebtoken';
import User from 'models/user';
import { promisify } from 'util';

const schema = {
  email: {
    in: 'body',
    exists: {
      errorMessage: 'err.required',
    },
    isEmail: {
      errorMessage: 'err.notEmail',
    },
    normalizeEmail: true,
  },

  password: {
    exists: {
      errorMessage: 'err.required',
    },
    trim: true,
  },
};

export default {
  path: '/users/signin',
  method: 'post',
  auth: false,
  schema,
  async handler(req) {
    const { email, password } = req.body;
    const login = promisify(req.login.bind(req));
    const user = await User.findOne({
      attributes: ['id', 'password', 'InstitutionId'],
      where: { email: email.toLowerCase() },
    });

    if (!user || !user.verifyPassword(password)) {
      throw new Error('err.invalidCredentials');
    }

    const err = await login(user);

    if (err) {
      throw err;
    }

    const digest = {
      id: user.getDataValue('id'),
      institutionId: user.getDataValue('institutionId'),
    };

    return {
      token: jwt.sign(digest, process.env.JWT_SECRET),
    };
  },
};
