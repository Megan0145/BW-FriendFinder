exports.up = function(knex) {
  return knex.schema.createTable("user_answers", tbl => {
    tbl.increments();
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users");
    tbl
      .integer("question_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("questions");
    tbl
      .integer("answer_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("answers");
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("user_answers");
};
