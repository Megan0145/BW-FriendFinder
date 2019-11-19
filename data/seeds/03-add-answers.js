
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('answers').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('answers').insert([
        { answer: 'tea' },
        { answer: 'coffee' },
        { answer: 'Tesla' },
        { answer: 'Lamborghini' },
        { answer: 'Brazil' },
        { answer: 'Japan' },
        { answer: 'archery' },
        { answer: 'cooking' },
        { answer: 'facebook' },
        { answer: 'twitter' },
        { answer: 'Titanic' },
        { answer: 'Hangover' },
        { answer: 'die young' },
        { answer: 'die at 100' },
        { answer: 'hiphop' },
        { answer: 'pop' },
        { answer: 'country' },
        { answer: 'workout' },
        { answer: 'get extra sleep' },
        { answer: 'life of the party' },
        { answer: 'wallflower' },
        { answer: 'indoors' },
        { answer: 'outdoors' },
        { answer: 'early' },
        { answer: 'late' },
      ]);
    });
};
