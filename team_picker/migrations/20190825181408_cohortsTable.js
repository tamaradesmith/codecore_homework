
exports.up = function(knex) {
  return knex.schema.createTable("cohorts", t =>{
      t.bigIncrements('id');
      t.string('name');
      t.string('members');
      t.string('logoUrl');
      
  })
};

exports.down = function(knex) {
return knex.schema.dropTable("cohorts")  
};
