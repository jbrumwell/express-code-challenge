import glob from 'glob';
import path from 'path';
import { each, clone } from 'lodash';
import { checkSchema, validationResult } from 'express-validator/check';
import passport from 'passport';

const paths = glob.sync(path.join(__dirname, '**/*.js'));

function response(handler) {
  return async (req, res, next) => {
    try {
      validationResult(req).throw();

      const result = await handler(req, res);

      res.send({
        status: 'success',
        data: result,
      });

      next('route');
    } catch (e) {
      next(e);
    }
  };
}

function normalize(module) {
  const handlers = [];

  let route = module.default ? clone(module.default) : clone(module);

  if (route.path && route.handler && route.method) {
    if (route.auth !== false) {
      handlers.push(passport.authenticate('jwt'));
    }

    if (route.schema) {
      handlers.push(checkSchema(route.schema));
    }

    handlers.push(response(route.handler));

    route.handler = handlers;
  } else {
    route = false;
  }

  return route;
}

export default (app) => {
  each(paths, (file) => {
    if (file !== __filename) {
      // eslint-disable-next-line
      const route = normalize(require(file));

      if (route) {
        app[route.method](route.path, route.handler);
      }
    }
  });
};
