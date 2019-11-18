exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("questions")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("questions").truncate([
        { question_body: "What's your favorite drink tea or coffee?" },
        { question_body: "What's your dream car, Tesla or Lamborghini?" },
        { question_body: "Where would you rather be from Japan or Brazil?" },
        {
          question_body:
            "What skill would you like to master, archery or cooking?"
        },
        {
          question_body:
            "What website do you visit most often, facebook or twitter?"
        },
        {
          question_body:
            "What movie title best describes your life, Titatic or Hangover ?"
        },
        { question_body: "Die young or live until 100?" },
        { question_body: "Hiphop, pop or country music?" },
        {
          question_body:
            "What's the best way to start the day, workout or get extra sleep?"
        },
        { question_body: " Life of the party or a wallflower?" },
        { question_body: "Indoors or Outdoors?" },
        { question_body: " Are you usually early or late?" }
      ]);
    });
};
