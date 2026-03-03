const { Sequelize } = require ('sequelize')
const { DATABASE_URL } = require('./config')

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection establishsed')
  } catch (error) {
    console.log(`Database connection failed. Error: ${error}`)
  }

  return null
}

module.exports = { sequelize, connectToDatabase }