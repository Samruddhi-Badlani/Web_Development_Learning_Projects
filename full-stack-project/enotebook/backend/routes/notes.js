const express = require('express')
const router = express.Router()


router.get('/',(req,res)=>{
    obj = {
        name:"Samruddhi",
        age: 20
    }
    res.json(obj);
})

module.exports = router