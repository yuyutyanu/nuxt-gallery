const router = require('express').Router()
const c = require('../../db/index')
const jwt = require('jsonwebtoken')

router.post('/register', (req, res, next) => {
  c.query('insert into user set ?', {email: req.body.email, password: req.body.password},
    (error, results, fields) => {
      if (error) throw error
      jwt.sign({'id': results.insertId}, process.env.JWT_SECRET, (error, token) => {
        if (error) throw error
        res.json(token)
      })
    })
})

router.post('/login', (req, res, next) => {
  c.query('select * from `user` where `email` = ? and `password` = ?', [req.body.email, req.body.password],
    (error, results, fields) => {
      if (error) throw error
      jwt.sign({'id': results[0].id}, process.env.JWT_SECRET, (error, token) => {
        if (error) throw error
        res.json(token)
      })
    })
})

module.exports = router
