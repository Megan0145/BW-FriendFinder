
exports.up = function(knex) {
  return knex.schema.createTable("answers", tbl => {
      tbl.increments();
      tbl.string("answer", 255).notNullable().unique()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("answers");
};
