const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');


// Create a User using POST "/api/auth" . Does not require Auth
router.post('/',[
    body('email','Enter a valid email').isEmail(),
  
  body('name','Enter a valid name ').isLength({ min: 3 }),
  body('password','Password must be of atleast 5 characters').isLength({ min: 5}),
],(req,res)=>{
    console.log(req.body);
   

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.create({
      name: req.body.name,
      email : req.body.email,
      
      password: req.body.password,
    }).then(user => res.json(user))
    .catch(err =>{
        console.log(err);
        res.json({
            error : "Email already registered!!",
            message : err.message
        })
    });

})




module.exports = router