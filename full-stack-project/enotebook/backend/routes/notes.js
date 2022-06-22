const express = require("express");
const Note = require("../models/Note");
const fetchUser = require("../middleware/fetchUser");
const router = express.Router();

const { body, validationResult } = require("express-validator");

// ROUTE 1 : Fetch All Notes Using GET '/api/notes/fetchallnotes .Login Required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
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

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
