const { Blog } = require('../models')
const AppError = require('../utils/appError')
const router  = require('express').Router()

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if(!req.blog){
    return next(new AppError('blog not found', 404))
  }

  next()
}

router.get('/', async (req, res, next) => {
  try {
    const blogs  = await Blog.findAll()
    res.json(blogs)
  } catch (error){
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const blog = await Blog.create({ ...req.body, date: new Date() })
    res.json(blog)
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', blogFinder, async (req, res, next) => {
  try {
    await req.blog.destroy()
    res.status(204).end()
  } catch (error){
    next(error)
  }
})

router.put('/:id', blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
  } catch (error){
    next(error)
  }
})

module.exports = router