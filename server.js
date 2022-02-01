const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: './build'
});

const PORT = process.env.PORT || 8000;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

server.use((req, _res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.use(jsonServer.rewriter({
  '/api/*': '/$1',
}));

// Use default router 
server.use(router);
server.listen(PORT, () => {
  console.log(
    '__________________________________\n\n'
    + '    JSON Server is running at:\n\n'
    + `\u001b[34m----> http://localhost:${PORT} <----\u001b[0m`
    + '\n__________________________________\n'
  );
});
