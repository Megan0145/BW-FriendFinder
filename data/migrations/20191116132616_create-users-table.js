exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl
      .string("username", 128)
      .unique()
      .notNullable();
    tbl.string("password", 128).notNullable();
    tbl.string("fname", 128);
    tbl.string("lname", 128);
    tbl.string("avatar_url", 128);
    tbl.string("DOB");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
