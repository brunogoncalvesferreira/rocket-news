const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {
  // 1 criar tabela
  // db.run(
  //   `
  //     CREATE TABLE IF NOT EXISTS emails (
  //       id INTEGER PRIMARY KEY AUTOINCREMENT,
  //       email TEXT
  //     )
  //   `
  // )

  // // 2 Inserindo dados na tabela
  // const query = `
  //       INSERT INTO emails (
  //         email
  //       ) VALUES ( ? )
  // `
  // const values = ["bruno@gmail.com"]

  // function insertValuesEmails(err) {
  //   if (err) {
  //     return console.log(err)
  //   }

  //   console.log("Email cadastrado!")
  // }

  // db.run(query, values, insertValuesEmails)

  // 3 Consultar dados na tabela
  db.all(`SELECT * FROM emails`, function (err, rows) {
    if (err) {
      return console.log(err)
    }
    console.log("E-mails cadastrados: ")
    console.log(rows)
  })

  // 4 Deletar dados na tabela
  db.run(`DELETE FROM emails WHERE id =?`, [8], function (err) {
    if (err) {
      return console.log(err)
    }
    console.log("E-mail deletado com sucesso!")
  })
})

module.exports = db
