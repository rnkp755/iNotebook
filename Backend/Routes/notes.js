const express = require('express');
const fetchUser = require('../Middleware/fetchUser');
const router = express.Router();
const Note = require('../Models/Note');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const { Schema } = mongoose;

//ROUTE : 1 :- Get all notes using GET "/api/notes/fetchdata" . Login Required
router.get('/fetchdata', fetchUser, async (req, res) => {
      try {
            const notes = await Note.find({ user: req.user.id });
            res.json(notes)
      }
      catch (error) {
            console.error(error.message);
            res.status(500).send("Something Went Wrong")
      }

})

//ROUTE : 2 :- Add a new Note using POST "/api/notes/adddata" . Login Required
router.post('/adddata', fetchUser, [
      body('title', 'Title must be of atleast 3 characters').isLength({ min: 3 }),
      body('description', 'Description must be of atleast 20 characters').isLength({ min: 20 }),
], async (req, res) => {
      try {
            const { title, description, tag } = req.body;
            const result = validationResult(req);
            if (!result.isEmpty()) {
                  return res.status(400).json({ errors: result.array() });      //Return Bad request if there are error
            }
            const note = new Note({
                  title, description, tag, user: req.user.id,
            })
            const savedNote = await note.save()
            res.json(savedNote)
      }
      catch (error) {
            console.error(error.message);
            res.status(500).send("Something Went Wrong")
      }
})

//ROUTE : 3 :- Update an existing Note using PUT "/api/notes/updatedata" . Login Required
router.put('/updatedata/:id', fetchUser, async (req, res) => {
      try {
            const { title, description, tag } = req.body;
            //Create a newnote object
            const newNote = {};
            if (title) { newNote.title = title };
            if (description) { newNote.description = description };
            if (tag) { newNote.tag = tag };

            //Find the note to be updated, check for novelity and update it.
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found") };

            if (note.user.toString() !== req.user.id) {
                  return res.status(401).send("Not Allowed");
            }

            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json({ note });
      }
      catch (error) {
            console.error(error.message);
            res.status(500).send("Something Went Wrong")
      }
})

//ROUTE : 4 :- Delete an existing Note using DELETE "/api/notes/deletedata" . Login Required
router.delete('/deletedata/:id', fetchUser, async (req, res) => {
      try {
            //Find the note to be Deleted, check for novelity and delete it.
            let note = await Note.findById(req.params.id);
            if (!note) { return res.status(404).send("Not Found") };


            //Allow Deletion only if user is authorised
            if (note.user.toString() !== req.user.id) {
                  return res.status(401).send("Not Allowed");
            }

            note = await Note.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Note has been Deleted Successfully", title: note.title });
      }
      catch (error) {
            console.error(error.message);
            res.status(500).send("Something Went Wrong")
      }
})

module.exports = router