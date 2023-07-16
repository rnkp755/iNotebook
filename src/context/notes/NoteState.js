import NoteContext from './noteContext';
import React, { useState } from 'react'

const NoteState = (props) => {
      const host = "http://127.0.0.1:5000"
      const notesInitial = []
      const [notes, setNotes] = useState(notesInitial);

      //Get All Notes

      const getNotes = async () => {
            //API CALL
            const response = await fetch(`${host}/api/notes/fetchdata`, {
                  method: 'GET',
                  headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token')
                  },
            });
            const json = await response.json();
            setNotes(json)
      }


      const addNote = async (title, description, tag) => {
            // API Call 
            const response = await fetch(`${host}/api/notes/adddata/`, {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token')
                  },
                  body: JSON.stringify({ title, description, tag })
            });

            //Client side
            const note = await response.json();
            setNotes(notes.concat(note))
      }


      //Edit a Note

      const editNote = async (id, title, description, tag) => {
            //API CALL
            // eslint-disable-next-line
            const response = await fetch(`${host}/api/notes/updatedata/${id}`, {
                  method: 'PUT',
                  headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token')
                  },
                  body: JSON.stringify({ title, description, tag })
            });
            // const json = await response.json();

            let newNotes = JSON.parse(JSON.stringify(notes))
            //Logic to Edit on Client side
            for (let index = 0; index < newNotes.length; index++) {
                  const element = newNotes[index];
                  if (element._id === id) {
                        newNotes[index].title = title;
                        newNotes[index].description = description;
                        newNotes[index].tag = tag;
                        break;
                  }
            }
            setNotes(newNotes);
      }

      //Delete Note

      const deleteNote = async (id) => {
            //API CALL
            // eslint-disable-next-line
            const response = await fetch(`${host}/api/notes/deletedata/${id}`, {
                  method: 'DELETE',
                  headers: {
                        'Content-Type': 'application/json',
                        "auth-token": localStorage.getItem('token')
                  },
            });
            // const json = response.json();
            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes)
      }

      return (
            <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
                  {props.children}
            </NoteContext.Provider>
      );
};

export default NoteState;
