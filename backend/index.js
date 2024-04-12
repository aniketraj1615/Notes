const connectToMongo=require('./db');
const express = require('express')
var cors=require('cors');

connectToMongo();


const app = express()
const port = 3002

//to use middleware
app.use(express.json());
app.use(cors());

//Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
  console.log(`Inotebook listening on port http://localhost: ${port}`)
})
