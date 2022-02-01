const jsonServer = require('json-server');
const server = jsonServer.create();
// const router = jsonServer.router('db.json');
const path = require('path');
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({
  static: './build'
});

// PORT || 4000 - Same as Heroku just in case.
const PORT = process.env.PORT || 4000;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use default router 
server.use('/api', router);
server.listen(PORT, () => {
  console.log(
    '\n__________________________________\n\n'
    + ' JSON Server is running!\n\n'
    + ' Heroku App:\n'
    + `\u001b[35m https://translate-noroff-app.herokuapp.com/ \u001b[0m\n\n`
    + ' Localhost:\n'
    + `\u001b[34m http://localhost:${PORT} \u001b[0m\n\n`
    + ' Resources:\n'
    + ` API:   \u001b[33m http://localhost:${PORT}/api \u001b[0m\n`
    + ` Users: \u001b[33m http://localhost:${PORT}/api/users \u001b[0m`
    + '\n__________________________________\n'
  );
});