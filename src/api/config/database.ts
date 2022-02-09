const mongoose = require('mongoose')

const dbName = 'genially_db'
module.exports = {
    connect: () => mongoose.connect('mongodb://localhost:27017/genially_db', () => {
      console.log("Me conecté a la BD");
    }),
    dbName,
    connection: () => {
      if(mongoose.connection){
        return mongoose.connection; 
      }
      return mongoose.connect()
    }
}