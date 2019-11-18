exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'James', password: '1234' },
        { username: 'Megan', password: '1234' },
        { username: 'Mildred', password: '1234' }
      ]);
    });
};