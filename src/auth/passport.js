import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import User from 'models/user';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await User.findOne({
        where: {
          id: payload.id,
        },
      });

      if (user) {
        done(null, user);
      } else {
        done(new Error('err.userNotFound'));
      }
    } catch (e) {
      done(e);
    }
  }),
);

passport.serializeUser((user, done) => {
  try {
    const payload = JSON.stringify({
      id: user.getDataValue('id'),
      institutionId: user.getDataValue('institutionId'),
    });

    done(null, payload);
  } catch (e) {
    done(e);
  }
});

passport.deserializeUser(async (user, done) => {
  try {
    const payload = JSON.parse(user);

    const instance = await User.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!instance) {
      throw new Error('err.invalidToken');
    }

    done(null, instance);
  } catch (e) {
    done(e);
  }
});
