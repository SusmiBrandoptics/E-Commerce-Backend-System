const express = require('express');
const userRoutes = require('./routes/userProfileRoutes');
const app = express()
const connectDB = require('./config/dbConnection')
const cookieParser = require("cookie-parser")
require('dotenv').config()


connectDB()
const port = process.env.PORT || 3000

app.use(express.json());
app.use(cookieParser())
app.use('/api/user', userRoutes)

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`)
})