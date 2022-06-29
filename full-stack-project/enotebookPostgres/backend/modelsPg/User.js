const Sequelize = require('sequelize');
const dbPostgres = require('../sequalizeDB');
const Note = require('../modelsPg/Note')

const User = dbPostgres.define('user',{

    _id : {
       
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        
    },
    name : {
        type :  Sequelize.STRING,
        allowNull : false
    
    
      },
      email : {
        type:Sequelize.STRING,
        allowNull : false,
        unique : true
      },
      password : {
        type:Sequelize.STRING,
        allowNull : false
      },
      date:{
        type : Sequelize.DATE,
        default:Date.now
      }
      
})


module.exports = User ;