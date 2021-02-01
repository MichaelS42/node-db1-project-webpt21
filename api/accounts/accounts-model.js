const db = require("../../data/dbConfig.js");
//Model Table CRUD
module.exports = {
  get,
  getbyID,
  create,
  update,
  remove,
};

//Read
async function get() {
  const sql = await db("accounts").toString();
  console.log(sql);

  const accounts = await db("accounts");
  return accounts;
}

async function getbyID(id) {
  const [account] = await db("accounts").where({ id });
  return account;
}
//Create
async function create(newData) {
  const [accountId] = await db("accounts").insert(data);
  const account = await getbyID(accountId);
  return account;
}

//Update
async function update(id, changes) {
  const count = await db("accounts").where({ id }).update(changes);
  return count;
}

//Delete
async function remove(id) {
  const count = await db("accounts").where({ id }).del();
  return counts;
}
