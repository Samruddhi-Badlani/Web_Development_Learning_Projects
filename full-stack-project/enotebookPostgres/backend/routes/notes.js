const express = require("express");
const Note = require("../models/Note");
const fetchUser = require("../middleware/fetchUser");
const NotePostgres = require("../modelsPg/Note");

const router = express.Router();

const { body, validationResult } = require("express-validator");

// ROUTE 1 : Fetch All Notes Using GET '/api/notes/fetchallnotes .Login Required

// Postgres route completed
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    const {email} = req.userPostgres ;
    const {id} = req.userPostgres;
    const notesPostgres = await NotePostgres.findAll({where : {userId : id }});
    res.json({notesPostgres,notes});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2 : Add a new Note Using POST '/api/notes/addnote .Login Required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),

    body("description", "Enter a valid description ").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      // If there are errors => return bad request and errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      //New Note created
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const createdAt = Date.now();
      const updatedAt = Date.now();


      const notePostgres =NotePostgres.create({
        title,
        description,
        tag,
        userId: req.userPostgres.id
      }).then(()=>{
        console.log("Addition successfull ")
      }).catch((err)=>{
        console.log("XYZHULLAHOO" , err);
      })
      const savedNote = await note.save();
      const savedPostgresNote = await  notePostgres

      res.json({savedPostgresNote,savedNote});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3 : Update an existing Note Using POST '/api/notes/updatenote .Login Required
// Postgres route completed
router.put("/updatenote/:idPostgres", fetchUser, async (req, res) => {
  try {

    const {title,description,tag} = req.body ;
    // const newNote = {};

    // if(title){
    //     newNote.title = title ;
    // }
    // if(description){
    //     newNote.description = description;
    // }
    // if(tag) {
    //     newNote.tag = tag ;
    // }

    const newNotePostgres = {};

    if(title){
        newNotePostgres.title = title ;
    }
    if(description){
        newNotePostgres.description = description;
    }
    if(tag) {
        newNotePostgres.tag = tag ;
    }

    //Find the note to be updated and update
    // let note = await  Note.findById(req.params.id);

    let notePostgres = await NotePostgres.findByPk(req.params.idPostgres);

    // if(!note){
    //     return res.status(404).send("Not found");
    // }
    // if(note.user.toString()  !== req.user.id){
    //     return res.status(401).send('Not Allowed');
    // }
    if(!notePostgres){
      return res.status(404).send("Not found");
  }
  if(notePostgres.userId  !== req.userPostgres.id){
      console.log("**********")
      // console.log(notePostgres.userId.toS)
      return res.status(401).json({message : 'Not allowed ',notePostgres});
  }

    // note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote},{new :true});

    notePostgres = await NotePostgres.update(newNotePostgres,{
      where : {_id : req.params.idPostgres}
    })

   
    res.json(notePostgres);

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 4 : Delete an existing Note Using DELETE '/api/notes/deletenote .Login Required
// Postgres route completed
router.delete("/deletenote/:idPostgres", fetchUser, async (req, res) => {
    try {
  
     
      // const newNote = {};

      
      //Find the note to be deleted and delete it
      // let note = await  Note.findById(req.params.id);
  
      // if(!note){
      //     return res.status(404).send("Not found");
      // }

      // // Deletion allowed only if the note is the user's note
      // if(note.user.toString()  !== req.user.id){
      //     return res.status(401).send('Not Allowed');
      // }

      const newNotePostgres = {};

      
      //Find the note to be deleted and delete it
      let notePostgres = await  NotePostgres.findByPk(req.params.idPostgres);
  
      if(!notePostgres){
          return res.status(404).send("Not found");
      }

      // Deletion allowed only if the note is the user's note
      if(notePostgres.userId !== req.userPostgres.id){
          return res.status(401).send('Not Allowed');
      }
  
      notePostgres = NotePostgres.destroy({
        where :{
          _id : req.params.idPostgres
        }
      })
      return res.json({"Success" : "Note has been deleted",notePostgres:notePostgres});
  
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });
  

module.exports = router;
