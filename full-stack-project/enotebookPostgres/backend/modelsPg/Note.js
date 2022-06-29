const Sequelize = require('sequelize');
const dbPostgres = require('../sequalizeDB');

const User = require('../modelsPg/User');

const Note = dbPostgres.define('notes',{

    _id : {
       
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        
    },
    title : {
        type :  Sequelize.STRING,
        allowNull : false
    
    
      },
      description : {
        type:Sequelize.STRING,
        allowNull : false,
      
      },
      tag : {
        type:Sequelize.STRING,
        allowNull : false
      },
      date:{
        type : Sequelize.DATE,
        default:Date.now
      }
      
})


module.exports = Note ;