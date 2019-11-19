
exports.seed = function(knex) {
  return knex('question_answers')
    .truncate()
    .then(function() {
      return knex('question_answers').insert([
        { question_id: "1", answer_id: "1" },
        { question_id: "1", answer_id: "2" },
        { question_id: "2", answer_id: "3" },
        { question_id: "2", answer_id: "4" },
        { question_id: "3", answer_id: "5" },
        { question_id: "3", answer_id: "6" },
        { question_id: "4", answer_id: "7" },
        { question_id: "4", answer_id: "8" },
        { question_id: "5", answer_id: "9" },
        { question_id: "5", answer_id: "10" },
        { question_id: "6", answer_id: "11" },
        { question_id: "6", answer_id: "12" },
        { question_id: "7", answer_id: "13" },
        { question_id: "7", answer_id: "14" },
        { question_id: "8", answer_id: "15" },
        { question_id: "8", answer_id: "16" },
        { question_id: "8", answer_id: "17" },
        { question_id: "9", answer_id: "18" },
        { question_id: "9", answer_id: "19" },
        { question_id: "10", answer_id: "20" },
        { question_id: "10", answer_id: "21" },
        { question_id: "11", answer_id: "22" },
        { question_id: "11", answer_id: "23" },
        { question_id: "12", answer_id: "24" },
        { question_id: "12", answer_id: "25" }
      ]);
    });
};
