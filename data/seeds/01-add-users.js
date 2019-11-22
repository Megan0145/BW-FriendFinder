const bcrypt = require("bcryptjs")
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        { username: 'James', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=656&q=80" },
        { username: 'Megan', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1541943181603-d8fe267a5dcf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=612&q=80" },
        { username: 'Colin', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1492462543947-040389c4a66c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
        { username: 'Luis', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1500027202745-eec1ad6523cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
        { username: 'Mildred', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1528475775637-ed767f76e6b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" },
        { username: 'Lisa', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1482028655172-fa4270a17164?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
        { username: 'Duro', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1498830923224-e1c12d1564a6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
        { username: 'Samuel', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1496346530827-534816eed3be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
        { username: 'Justinas', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1495366691023-cc4eadcc2d7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
        { username: 'Ayomide', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1444069069008-83a57aac43ac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
        { username: 'Tolu', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1481093903765-de0b1d88f1a5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
        { username: 'Sarah', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1481410491085-5e00972436e1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
        { username: 'Derek', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1496239943629-500dbbf945b1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
        { username: 'Tony', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1489980721706-f487dab89c24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" },
        { username: 'Conor', password: bcrypt.hashSync('1234', 10), avatar_url: "https://images.unsplash.com/photo-1496360166961-10a51d5f367a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60" }
      ]);
    });
};