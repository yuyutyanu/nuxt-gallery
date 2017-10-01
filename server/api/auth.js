const router = require('express').Router()
const c = require('../../db/index')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.post('/register', (req, res, next) => {
  c.query('insert into user set ?', {email: req.body.email, password: req.body.password},
    (error, results, fields) => {
      if (error) {
        res.json({error: true})
        res.end()
      }else {
        jwt.sign({'id': results.insertId}, process.env.JWT_SECRET, (error, token) => {
          if (error) throw error
          res.json(token)
          res.end()
        })
      }
    })
})

router.post('/login', (req, res, next) => {
  c.query('select * from `user` where `email` = ? and `password` = ?', [req.body.email, req.body.password],
    (error, results, fields) => {
      if (error) throw error
      if (results[0]) {
        jwt.sign({'id': results[0].id}, process.env.JWT_SECRET, (error, token) => {
          if (error) throw error
          res.json(token)
          res.end()
        })
      }else {
        res.json({error: true})
        res.end()
      }
    })
})

router.post('/__t', (req, res, next) => {
  jwt.sign({'guest': true}, process.env.JWT_SECRET, (error, token) => {
    return res.json(token)
  })
})

module.exports = router
