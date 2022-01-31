import { create, router as _router, defaults, bodyParser } from 'json-server'
const server = create()
const router = _router('db.json')
const middlewares = defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)


// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router 
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})