exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'James', password: bcrypt.hashSync('1234', 10) },
        { username: 'Megan', password: bcrypt.hashSync('1234', 10) },
        { username: 'Colin', password: bcrypt.hashSync('1234', 10) },
        { username: 'Luis', password: bcrypt.hashSync('1234', 10) },
        { username: 'Mildred', password: bcrypt.hashSync('1234', 10) },
        { username: 'Lisa', password: bcrypt.hashSync('1234', 10) },
        { username: 'Duro', password: bcrypt.hashSync('1234', 10) },
        { username: 'Samuel', password: bcrypt.hashSync('1234', 10) },
        { username: 'Justinas', password: bcrypt.hashSync('1234', 10) },
        { username: 'Ayomide', password: bcrypt.hashSync('1234', 10) },
        { username: 'Tolu', password: bcrypt.hashSync('1234', 10) },
        { username: 'Sarah', password: bcrypt.hashSync('1234', 10) },
        { username: 'Derek', password: bcrypt.hashSync('1234', 10) },
        { username: 'Tony', password: bcrypt.hashSync('1234', 10) },
        { username: 'Conor', password: bcrypt.hashSync('1234', 10) }
      ]);
    });
};