const connectToMongo = require('./db');
const express = require('express')
const app = express()
var cors = require('cors')
const port = 5000;
const UserPostgres = require('./modelsPg/User')
const NotePostgres = require('./modelsPg/Note');
connectToMongo();
const sequelize= require('./sequalizeDB');

initialize();

async function initialize() {


  UserPostgres.hasMany(NotePostgres);
  NotePostgres.belongsTo(UserPostgres);
   
    await sequelize.sync({alter: true });
}


app.use(express.json());
app.use(cors())

// Available Routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

