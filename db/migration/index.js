const c = require('../index')

c.query(`drop table user;`)
c.query(`drop table gallery;`)

c.query(
  `CREATE TABLE user (
   id    MEDIUMINT NOT NULL AUTO_INCREMENT,
   email VARCHAR(50) UNIQUE NOT NULL,
   password VARCHAR(50) NOT NULL,
   PRIMARY KEY (id)
  );`
)

c.query(
  `CREATE TABLE gallery (
   id    MEDIUMINT NOT NULL AUTO_INCREMENT,
   user_id MEDIUMINT,
   title VARCHAR(50),
   url MEDIUMTEXT,
   uploadedAt TIMESTAMP,
   PRIMARY KEY (id),
   CONSTRAINT foreign_key FOREIGN KEY (user_id) REFERENCES user(id)
  );`
)


module.exports = c
