const c = require('../index')

c.query(`drop table gallery;`)
c.query(`drop table user;`)

c.query(
  `CREATE TABLE gallery (
   id    MEDIUMINT NOT NULL AUTO_INCREMENT,
   title VARCHAR(50),
   url MEDIUMTEXT,
   uploadedAt TIMESTAMP,
   PRIMARY KEY (id)
  );`
)

c.query(
  `CREATE TABLE user (
   id    MEDIUMINT NOT NULL AUTO_INCREMENT,
   email VARCHAR(50) UNIQUE NOT NULL,
   password VARCHAR(50) NOT NULL,
   PRIMARY KEY (id)
  );`
)

module.exports = c
