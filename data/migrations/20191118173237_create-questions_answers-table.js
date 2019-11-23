
exports.up = function(knex) {
    return knex.schema.createTable("question_answers", tbl => {
        tbl.increments();
        tbl
          .integer("question_id")
          .notNullable()
          .unsigned()
          .references("id")
          .inTable("questions")
          .onDelete("CASCADE");
        tbl
          .integer("answer_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("answers")
          .onDelete("CASCADE");
      });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("question_answers")
};
