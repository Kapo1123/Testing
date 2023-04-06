const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const bcrypt = require('bcrypt');
const uuid = require('uuid');




if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);


const userCollection = client.db('startup').collection('user');

const trollCollection = client.db('startup').collection('troll');

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}


function addURL(urls) {
  trollCollection.insertOne(urls);
    console.log("inserting troll url");
}

function getallurls(userName) {
  const query = {name: userName};
  const options = {
    sort: {$natural: -1},
    limit: 6,
  };
  
  const cursor = trollCollection.find(query, options);
  // console.log(cursor);
  return cursor.toArray();
}
function delete_link(content){
  const query = {
    lists_urls: content};
    const cursor = trollCollection.deleteMany(query);
    return cursor.acknowledged;

}
module.exports = {
  delete_link,
  getallurls,
  getUser,
  getUserByToken,
  addURL,
  createUser
}