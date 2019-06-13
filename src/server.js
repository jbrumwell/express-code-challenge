import express from 'express';
import parser from 'body-parser';
import helmet from 'helmet';
import routes from 'routes/index';
import passport from 'passport';

import 'auth/passport';

function configure(app) {
  app.use(helmet());
  app.use(parser.json());
  app.use(
    parser.urlencoded({
      extended: true,
    }),
  );
  app.use(passport.initialize());
}

const app = express();

configure(app);
routes(app);

app.use((err, req, res, next) => {
  let response;

  if (err.message === 'Validation failed') {
    response = {
      status: 'fail',
      data: err.mapped(),
    };
  } else if (err.message.indexOf('err.') === 0) {
    response = {
      status: 'fail',
      data: {
        type: err.message,
      },
    };
  } else {
    response = {
      status: 'error',
      message: err.message,
    };
  }

  res.send(response);
  next();
});

export default app;
