exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'James', password: '1234' },
        { username: 'Megan', password: '1234' },
        { username: 'Colin', password: '1234' },
        { username: 'Luis', password: '1234' },
        { username: 'Mildred', password: '1234' },
        { username: 'Lisa', password: '1234' },
        { username: 'Duro', password: '1234' },
        { username: 'Samuel', password: '1234' },
        { username: 'Justinas', password: '1234' },
        { username: 'Ayomide', password: '1234' },
        { username: 'Tolu', password: '1234' },
        { username: 'Sarah', password: '1234' },
        { username: 'Derek', password: '1234' },
        { username: 'Tony', password: '1234' },
        { username: 'Conor', password: '1234' }
      ]);
    });
};