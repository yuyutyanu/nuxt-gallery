const router = require('express').Router()
const c = require('../../db/index')
const jwt = require('jsonwebtoken')
require('dotenv').config()

router.get('/index', (req, res, next) => {
  c.query('select * from gallery',
    (error, results, fields) => {
      if (error) throw error
      res.json(results)
    })
})

router.post('/create', (req, res, next) => {
  if (req.body.__t && req.body.__t !== null) {
    jwt.verify(req.body.__t, process.env.JWT_SECRET, (error, decoded) => {
      if (error) throw error
    })
  }else if(req.body.user_id){
    throw new Error('不正なリクエスト')
  }
  c.query(`insert into gallery set ?`, {
      user_id: req.body.user_id,
      title: req.body.title,
      url: req.body.url,
      uploadedAt: new Date()
    },
    (error, results, fields) => {
      if (error) throw error
      res.status(200).end('success')
    })
})

router.delete('/delete/:id/:__t?', (req, res, next) => {
  c.query(`delete from gallery where id = ?`, [req.params.id],
    (error, results, fields) => {
      if (error) throw error
      res.status(200).end('success')
    })
})

module.exports = router
