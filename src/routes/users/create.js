import login from 'routes/users/login';
import Institution from 'models/institution';
import User from 'models/user';

const schema = {
  name: {
    in: 'body',
    trim: true,
    exists: {
      errorMessage: 'err.required',
    },
  },

  email: {
    in: 'body',
    exists: {
      errorMessage: 'err.required',
    },
    isEmail: {
      errorMessage: 'err.notEmail',
    },
    normalizeEmail: true,
    custom: {
      errorMessage: 'err.institutionDomainNotFound',
      options: async (value, { req }) => {
        const [, domain] = value.split('@');
        const institution = await Institution.findOne({
          attributes: ['id'],
          where: {
            domain,
          },
        });

        if (!institution) {
          throw new Error('institution not found');
        }

        req.body.institutionId = institution.getDataValue('id');
      },
    },
  },

  confirmPassword: {
    exists: {
      errorMessage: 'err.required',
    },
    trim: true,
  },

  password: {
    trim: true,
    custom: {
      errorMessage: 'err.passwordMismatch',
      options: (value, { req }) => {
        if (value !== req.body.confirmPassword) {
          throw new Error('Password mismatch');
        }

        return value;
      },
    },
  },
};

export default {
  path: '/users/create',
  method: 'post',
  auth: false,
  schema,
  async handler(req, res) {
    const { name, email, password } = req.body;
    let user = await User.findOne({
      attributes: ['id'],
      where: {
        email,
      },
    });

    if (user) {
      throw new Error('err.userAlreadyRegistered');
    }

    user = await User.create({
      name,
      email,
      password: User.encryptPassword(password),
      role: User.roleTypes.student,
      institutionId: req.body.institutionId,
    });

    return login.handler(req, res);
  },
};
