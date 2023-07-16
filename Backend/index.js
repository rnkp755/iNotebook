const connectToMongo = require('./database');
var cors = require('cors')
const express = require('express')
connectToMongo();

const app = express()
const port = 5000


app.use(cors())

app.use(express.json());

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

//Available Routes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/notes', require('./Routes/notes'))


app.listen(port, () => {
  console.log(`iNoteBook - BackEnd listening on http://127.0.0.1:${port}`)
})