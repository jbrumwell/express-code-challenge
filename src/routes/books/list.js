import Institution from 'models/institution';
import Book from 'models/book';
import { parseInt } from 'lodash';

const schema = {
  page: {
    in: 'query',
    exists: {
      errorMessage: 'err.required',
    },
    customSanitizer: {
      options: value => (value && value > 0 ? parseInt(value) : 1),
    },
  },
};

export default {
  method: 'get',
  path: '/books',
  schema,
  async handler(req) {
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = (page - 1) * limit;
    const institutionId = req.user.getDataValue('institutionId');

    return Book.findAll({
      attributes: ['id', 'title', 'isbn', 'author'],
      offset,
      limit,
      include: [
        {
          model: Institution,
          attributes: ['id'],
          where: {
            id: institutionId,
          },
        },
      ],
    });
  },
};
