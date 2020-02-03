// router middleware for Express
const {Router} = require('express')
const router = Router()
const config = require('config')
const mysql = require('mysql')

// endpoints for API

//  /api/products
router.get('/', async (req, res) => {

  const dbConnection = mysql.createConnection({
    host: config.get('dbhost'),
    user: config.get('dbuser'),
    password: config.get('dbpassword'),
    database: config.get('dbname')
  })

  try {
    // get all products
    const sql = "SELECT * FROM `products` ORDER BY `name` ASC"
    let products = []
    await dbConnection.query(sql, function (error, results, fields) {
      if (error) throw error

      console.log('products received in results - ', results.length)
      products = results
      console.log('products assigned', products.length);

      res.status(200).json({
        message: "All products loaded successfully.",
        products
      })

    })
  } catch (e) {
    console.log(e);
    res.status(500).json({message: "Cannot get products, please try again later."})
  }
})

// router.get('/products/:id', async (req, res) => {
//   try {
//
//   } catch (e) {
//     res.status(500).json({ message: 'Cannot get the product, please try again later.' })
//   }
// })

module.exports = router
