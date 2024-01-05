const express = require('express')
const app = express()
app.use(express.json())
const {open} = require('sqlite')
const path = require('path')
const dbpath = path.join(__dirname, 'todoApplication.db')
const sqlite3 = require('sqlite3')
let db = null

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Server Running at http://localhost:3000/')
    })
  } catch (e) {
    console.log(`DB Error: ${e.message}`)
  }
}
initializeDBAndServer()

//API 1
app.get('/todos/', async (request, response) => {
  const {status} = request.query
  const GetAllTodoslistQuery = `
      SELECT * FROM todo
      WHERE status LIKE "%${status}%";
  `
  const TodoDBResponse = await db.all(GetAllTodoslistQuery)
  response.send(TodoDBResponse)
})

// API 2
app.get('/todos/', async (request, response) => {
  const {priority} = request.query
  const GetHighPriorityListQuery = `
    SELECT * FROM todo
    WHERE priority LIKE "%${priority}%";
  `
  const HighPriorityDBResponse = await db.all(GetHighPriorityListQuery)
  response.send(HighPriorityDBResponse)
})
