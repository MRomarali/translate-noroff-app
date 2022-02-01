const jsonServer = require('json-server')  
const server = jsonServer.create()  
const router = jsonServer.router('db.json')  
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3001;

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, _res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

// Use default router 
server.use(router);
server.listen(port, () => {
  console.log('JSON Server is running');
});
