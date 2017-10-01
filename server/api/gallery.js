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
  var user_id
  jwt.verify(req.get('Authorization'), process.env.JWT_SECRET, (error, token) => {
    if(error) throw error
    if(token.guest && token.guest === true){
      user_id = null
    }else if(token.id){
      user_id = token.id
    }else{
      throw new Error('写真を登録する権限がありません')
    }
  })
  c.query(`insert into gallery set ?`, {
      user_id: user_id,
      title: req.body.title,
      url: req.body.url,
      uploadedAt: new Date()
    },
    (error, results, fields) => {
      if (error) throw error
      res.status(200).end('success')
    })
})

router.delete('/delete/:photoId/:photoUserId?', (req, res, next) => {
  jwt.verify(req.get('Authorization'), process.env.JWT_SECRET, (error, token) => {
    if (token.id && req.params.photoUserId  && Number(req.params.photoUserId) !== Number(token.id)) throw new Error('写真を消す権限がありません')
    if (token.guest && req.params.photoUserId && token.guest === true) throw new Error('写真を消す権限がありません')
  })

  c.query(`delete from gallery where id = ?`, [req.params.photoId],
    (error, results, fields) => {
      if (error) throw error
      res.status(200).end('success')
    })
})

module.exports = router
