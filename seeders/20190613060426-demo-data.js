module.exports = {
  up: queryInterface => queryInterface
    .bulkInsert(
      'institutions',
      [
        {
          name: 'AAA',
          url: 'www.aaa.com',
          domain: 'aaa.com',
        },
        {
          name: 'BBB',
          url: 'www.bbb.com',
          domain: 'bbb.com',
        },
        {
          name: 'CCC',
          url: 'www.ccc.com',
          domain: 'ccc.com',
        },
      ],
      {},
    )
    .then(() => queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'A-User',
          email: 'a@aaa.com',
          role: 'student',
          password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
          institution_id: 1,
        },
        {
          name: 'B-User',
          email: 'b@bbb.com',
          role: 'student',
          password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
          institution_id: 2,
        },
        {
          name: 'C-User',
          email: 'c@ccc.com',
          role: 'student',
          password: '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4',
          institution_id: 3,
        },
      ],
      {},
    ))
    .then(() => queryInterface.bulkInsert(
      'books',
      [
        {
          isbn: 'iamisbn-1',
          title: 'A-1',
          author: 'A-1',
        },
        {
          isbn: 'iamisbn-2',
          title: 'A-2',
          author: 'A-2',
        },
        {
          isbn: 'iamisbn-3',
          title: 'A-3',
          author: 'A-3',
        },
        {
          isbn: 'iamisbn-4',
          title: 'B-1',
          author: 'B-1',
        },
      ],
      {},
    ))
    .then(() => queryInterface.bulkInsert(
      'institution_books',
      [
        {
          book_id: 1,
          institution_id: 1,
        },

        {
          book_id: 2,
          institution_id: 1,
        },

        {
          book_id: 3,
          institution_id: 1,
        },

        {
          book_id: 4,
          institution_id: 2,
        },
      ],
      {},
    )),

  down() {},
};
