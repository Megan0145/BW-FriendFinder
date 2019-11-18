exports.up = function(knex) {
  return knex.schema.createTable("questions", tbl => {
    tbl.increments();
    tbl
      .string("question_body", 255)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("questions");
};
