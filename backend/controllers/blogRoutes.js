const { Blog } = require('../models')
const router  = require('express').Router()

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

router.delete('/:id', async (req, res ) => {
  try {
    const blog = await Blog.findByPk(req.params.id)
    if(!blog){
      res.status(404).json({ message: 'blog not found' })
    }

    await blog.destroy()
    res.status(204).end()
  } catch {
    res.status(404).end()
  }
})

module.exports = router