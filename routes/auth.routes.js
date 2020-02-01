// router middleware for Express
const {Router} = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const mysql = require('mysql')

// endpoints for API

//  /api/auth/register
router.post('/register', async (req, res) => {
  // get fields from registration form
  const {name, email, password} = req.body

  if ( name === '' || email === '' || password === '') {
    return res.status(400).json({message: "Please fill in all fields to register."})
  }

  // create DB connection
  const dbConnection = mysql.createConnection({
    host: config.get('dbhost'),
    user: config.get('dbuser'),
    password: config.get('dbpassword'),
    database: config.get('dbname')
  })

  try {
    let candidate = null

    // create sql to be used to check if email already exists
    let sql = "SELECT `id` FROM `users` WHERE `email` = ?"
    // perform query
    await dbConnection.query(sql, email, function (error, results, fields) {
      if (error) throw error

      if (results.length > 0) {
        candidate = results[0].id
        console.log('set candidate', candidate)
      }

      if (candidate === null) {
        console.log('if candidate null', candidate)
        // create sql to create user
        sql = "INSERT INTO `users`(`name`, `email`, `password`, `token`) VALUES (?, ?, ?, ?)"
        const hashedPassword = bcrypt.hashSync(password, 12)
        dbConnection.query(sql, [name, email, hashedPassword, ''], function (error, results, fields) {
          if (error) throw error
        })
        res.status(201).json({message: "The user has been successfully created!"})
      } else {
        console.log('else some candidate', candidate, typeof candidate);
        return res.status(400).json({message: "This email is already taken. Please use another email address."})
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Some server error during registration, please try again."})
  }
})

//  /api/auth/login
router.post('/login', async (req, res) => {
  const {name, email, password} = req.body

  if ( email === '' || password === '') {
    return res.status(400).json({message: "Please enter email and password to login."})
  }

  const dbConnection = mysql.createConnection({
    host: config.get('dbhost'),
    user: config.get('dbuser'),
    password: config.get('dbpassword'),
    database: config.get('dbname')
  })

  try {
    // find user by email
    const sql = "SELECT `password` FROM `users` WHERE `email` = ?"
    await dbConnection.query(sql, email, function (error, results, fields) {
      if (error) throw error

      const hashedPassword = results[0].password
      const passwordMatch = bcrypt.compareSync(password, hashedPassword)
      if (!passwordMatch) {
        return res.status(400).json({message: "Wrong password, please try again."})
      } else {
        // generate token
        const token = jwt.sign(
          { email: email },
          config.secret
        )

        // add it to user to DB
        const sqlUpdateToken = "UPDATE `users` SET `token` = ? WHERE email = ?"
        dbConnection.query(sqlUpdateToken, [token, email], function (error, results, fields) {
          if (error) throw error
        })

        // send it to front-end
        res.status(200).json({
          message: `Welcome!`,
          token
        })
      }
    })
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Some server error during login, please try again."})
  }

})

module.exports = router
