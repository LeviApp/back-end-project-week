
exports.up = function(knex, Promise) {
    return knex.schema.createTable('quotes', table => {
        table.increments();
        table.string('title');
        table.string('textBody');
        table.string('img_url');
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('quotes');
  };
  