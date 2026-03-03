const { Blog } = require('../models')
const router  = require('express').Router()

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if(!req.blog){
    res.status(404).end()
  }

  next()
}

router.get('/', async (req, res) => {
  try {
    const blogs  = await Blog.findAll()
    res.json(blogs)
  } catch {
    res.status(404).end()
  }
})

router.post('/', async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, date: new Date() })
    res.json(blog)
  } catch {
    res.status(404).end()
  }
})

router.delete('/:id', blogFinder, async (req, res) => {
  try {
    await req.blog.destroy()
    res.status(204).end()
  } catch {
    res.status(404).end()
  }
})

router.put('/:id', blogFinder, async (req, res) => {
  try {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } catch {
    res.status(404).end()
  }
})

module.exports = router