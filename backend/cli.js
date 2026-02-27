require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()
app.use(express.json())

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  date: {
    type: DataTypes.DATE
  }
}, {
  sequelize,
  underscored:true,
  timestamps: false,
  modelName: 'blog'
})
Blog.sync()

app.get('/api/blogs', async (req, res) => {
  try {
    const blogs  = await Blog.findAll()
    res.json(blogs)
  } catch {
    res.status(404).end()
  }
})

app.post('/api/blogs', async (req, res) => {
  try {
    const blog = await Blog.create({ ...req.body, date: new Date() })
    res.json(blog)
  } catch {
    res.status(404).end()
  }
})

app.delete('/api/blogs/:id', async (req, res ) => {
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

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})