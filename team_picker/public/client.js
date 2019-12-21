const knexConntor =require('knex');
const knexDelevopmentConfig=require('../knexfile').development;
const client= knexConntor(knexDelevopmentConfig);
module.exports=client;