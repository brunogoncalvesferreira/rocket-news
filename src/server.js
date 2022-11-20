const express = require("express")

const server = express()

const db = require("./database/db.js")

server.use(express.urlencoded({ extended: true }))

server.use(express.static("public"))

const nunjucks = require("nunjucks")
nunjucks.configure("src/page", {
  express: server,
  noCache: true,
})

server.get("/", (req, res) => {
  req.query
  return res.render("index.html")
})

server.post("/sucesso", (req, res) => {
  // 1 criar tabela
  db.run(`
      CREATE TABLE IF NOT EXISTS emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT
      )
    `)
  // 2 Inserindo dados na tabela
  const query = `
        INSERT INTO emails (
          email
        ) VALUES ( ? )
  `
  const values = [req.body.email]

  function insertValuesEmails(err) {
    if (err) {
      return console.log(err)
    }
    console.log("Email cadastrado!")

    return res.render("sucess.html", { saved: true })
  }
  db.run(query, values, insertValuesEmails)
})

server.get("/e-mails", (req, res) => {
  db.all(`SELECT * FROM emails`, (err, rows) => {
    if (err) {
      return console.log(err)
    }
    console.log("Aqui estão os emails!")
    console.log(rows)
    return res.render("e-mails.html", { emails: rows })
  })
})
server.listen(3000)
