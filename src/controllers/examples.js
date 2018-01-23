import { Router } from 'express'

import Example from '../models/Example'

const router = new Router()

router.use('/:id', loadAndVerifyExample)

router.get('/', listExamples)
router.post('/', createExample)
router.get('/:id', showExample)

async function listExamples (req, res) {
  try {
    const [exampleCount, examples] = await Promise.all([
      Example.count(),
      Example.getExample()
    ])
    res.send({ examples, exampleCount })
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('/')
  }
}

async function createExample (req, res) {
  try {
    const example = await Example.post({
      foo: req.body.foo,
      bar: req.body.bar
    })

    req.flash('success', `The ${example.foo} ${example.bar} example has been created.`)
    res.redirect(`/example/${example.id}`)
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('/')
  }
}

function showExample (req, res) {
  res.send(JSON.stringify(req.example))
}

const NON_RESOURCE_IDS = ['new']

async function loadAndVerifyExample (req, res, next) {
  if (NON_RESOURCE_IDS.includes(req.params.id)) {
    return next()
  }

  try {
    const example = await Example.getExample(req.params.id)
    if (!example) {
      throw new Error(`No entry found for ID ${req.params.id}`)
    }

    req.example = example
    next()
  } catch (err) {
    req.flash('error', err.message)
    res.redirect('/')
  }
}

export default router
