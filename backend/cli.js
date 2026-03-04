const express = require('express')
const app = express()

const { connectToDatabase } = require('./utils/db')
const { PORT } = require('./utils/config')

const blogRouter  = require('./controllers/blogRoutes')
const { unknownEndpoint, errorHandler } = require('./utils/middlewares')

app.use(express.json())

app.use('/api/blogs', blogRouter )

app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}
start()