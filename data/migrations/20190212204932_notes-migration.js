
exports.up = function(knex, Promise) {
  return knex.schema.createTable('NOTES', table => {
      table.increments();
      table.string('title');
      table.string('textBody');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('NOTES');
};
