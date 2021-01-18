const fs = require('fs');
const { Client } = require('pg');

const {
    POSTGRES_HOST,
    POSTGRES_PORT,
    POSTGRES_DATABASE,
  POSTGRES_USER,
  POSTGRES_PASSWORD
} = process.env;

let _client;

async function connect(){

  if(_client) return _client;

  const client = new Client({
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE
  });

  try {
    await client.connect();
    return _client = client;
  } catch (e) {
    setTimeout(connect, 500)
    return _client = null;
  }
  
}

async function setup(){
  const client = await connect();
  if(!client || !client.query) return setTimeout(setup, 500);
  const schemas = fs.readFileSync('src/schema.sql', 'utf8');
  client.query(schemas);
}

module.exports = {
  connect,
  setup
};