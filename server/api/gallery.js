const router = require('express').Router()
const c = require('../../db/index')

router.get('/index', (req, res, next) => {
  c.query('select * from gallery',
    (error, results, fields) => {
      if (error) throw error
      res.json(results)
    })
})

router.post('/create', (req, res, next) => {
  c.query(`insert into gallery set ?`, {title: req.body.title, url: req.body.url, uploadedAt: new Date()},
    (error, results, fields) => {
      if (error) throw error
      res.status(200).end('success')
    })
})

router.delete('/delete/:id', (req, res, next) => {
  c.query(`delete from gallery where id = ?`, [req.params.id],
    (error, results, fields) => {
      if (error) throw error
      res.status(200).end('success')
    })
})

module.exports = router
