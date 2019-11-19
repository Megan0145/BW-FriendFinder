exports.up = function(knex) {
  return knex.schema.createTable("messages", tbl => {
    tbl.increments();
    tbl.text("message").notNullable();
    tbl
      .integer("sender_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users");
    tbl
      .integer("receiver_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("messages");
};
