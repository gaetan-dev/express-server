import { Router } from 'express'

const router = new Router()

const api = {
  EXAMPLE: {
    GET: {
      '/example': 'return all examples',
      '/example/:id': 'return the example by id'
    },
    POST: {
      'example': 'create new example'
    }
  }
}

router.get('/', (req, res) => {
  if (req.flash('error').length > 0) {
    return res.status(500).send(req.flash())
  }
  res.send(JSON.stringify(api))
})

export default router
