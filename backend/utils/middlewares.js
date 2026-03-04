const errorHandler = (error, req, res, _next) => {
  console.error('-->> ERROR START -->>')
  console.error('Name:', error.name)
  console.error('Message:', error.message)
  console.error('Status:', error.status)
  console.error('Stack:', error.stack)
  console.error('Parent Code:', error.parent?.code)
  console.error('<<-- ERROR END <<--')

  if (error.statusCode) { // this statement match the custom error handler file appError
    return res.status(error.statusCode).json({
      status: error.status,
      error: error.message
    })
  } else if(error.name === 'SequelizeValidationError'){
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ error: error.message })
  }
  //final fallback. In this case we are not using next(error), because it passes errors to express to handle.
  return res.status(500).json({ error: 'Internal server error' })
}

const unknownEndpoint = (req, res) => {
  return res.status(404).json({
    error: 'unknown endpoint'
  })
}

module.exports = {
  errorHandler,
  unknownEndpoint
}