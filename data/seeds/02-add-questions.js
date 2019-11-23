exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("questions")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("questions").insert([
        { question: "What's your favorite drink tea or coffee?" },
        { question: "What's your dream car, Tesla or Lamborghini?" },
        { question: 'Where would you rather visit Japan or Brazil?' },
        { question: 'What skill would you like to master, archery or cooking?' },
        { question: 'What website do you visit most often, facebook or twitter?' },
        { question: 'What movie title best describes your life, Titatic or Hangover ?' },
        { question: 'Die young or live until 100?' },
        { question: 'Hiphop, pop or country music?' },
        { question: "What's the best way to start the day, workout or get extra sleep?" },
        { question: 'Life of the party or a wallflower?' },
        { question: 'Indoors or Outdoors?' },
        { question: 'Are you usually early or late?' },
        { question: 'Do you prefer running or swimmming?' },
        { question: 'Scuba diving or skydiving' },
      ]);
    });
};
