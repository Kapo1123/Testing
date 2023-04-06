const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const {peerProxy} = require('./peerProxy.js');
const DB = require('./database.js');

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;
const authCookieName = 'token';


// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());
// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    } 
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

apiRouter.get('/user/:email', async (req, res) => {
  const user = await DB.getUser(req.params.email);
  if (user) {
    const token = req?.cookies.token;
    res.send({ email: user.email, authenticated: token === user.token });
    return;
  }
  res.status(404).send({ msg: 'Unknown' });
});

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});






let links = ["https://i.gifer.com/4jcE.mp4","https://i.gifer.com/19ps.mp4","https://i.gifer.com/JaBP.mp4","https://i.gifer.com/BZXa.mp4","https://i.gifer.com/ZKDW.mp4" ,"https://i.gifer.com/EyoD.mp4"];
// localStorage.setItem('urls',links);

apiRouter.get('/links', async(_req, res) => {
  res.send(links);
});
// let updating =[];
apiRouter.post('/urls', async (_req, res) => {
  console.log(_req.body);
  DB.addURL(_req.body);
  const urls = await DB.getallurls(_req.body.userName);
  res.send(urls);
});
apiRouter.get('/urls/:userName', async (_req, res) => {
  console.log(_req);
  console.log("This is the user name: " + _req.params.userName);
  const urls = await DB.getallurls(_req.params.userName);
  res.send(urls);
});
apiRouter.delete('/urls/:content', async (_req, res) => {
  console.log(_req);
  if( await DB.delete_link(_req.params.content)){
    res.sendStatus(200);
  }
  console.log("This is the deleted item: " + _req.params.content);
});


// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
peerProxy(httpService);
