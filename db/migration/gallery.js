const c = require('../index')

c.query(`drop table gallery;`)

c.query(
  `CREATE TABLE gallery (
   id    MEDIUMINT NOT NULL AUTO_INCREMENT,
   title VARCHAR(50),
   url MEDIUMTEXT,
   uploadedAt TIMESTAMP,
   PRIMARY KEY (id)
  );`
)

module.exports = c
