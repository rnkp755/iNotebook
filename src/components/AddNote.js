import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
      const context = useContext(noteContext);
      const { addNote } = context;

      const [note, setNote] = useState({ title: "", description: "", tag: "" })

      const handleaddnoteclick = (e) => {
            e.preventDefault()
            addNote(note.title, note.description, note.tag);
            setNote({ title: "", description: "", tag: "" })
            props.showAlert("Added Successfully", "success")
      }
      const onchange = (e) => {
            setNote({ ...note, [e.target.name]: e.target.value })
      }
      return (
            <div className="container">
                  <h1>Add a Note</h1>
                  <div className="container">
                        <div className="mb-3">
                              <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                              <input type="text" className="form-control" id="title" name="title" value={note.title} placeholder="Enter Your Title" onChange={onchange} minLength={3} required />
                        </div>
                        <div className="mb-3">
                              <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                              <textarea className="form-control" id="description" name="description" value={note.description} placeholder="Enter Your Description" rows="4" onChange={onchange} minLength={20} required></textarea>
                        </div>
                        <div className="mb-3">
                              <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                              <input type="text" className="form-control" id="tag" name="tag" value={note.tag} placeholder="Enter Your Tag" onChange={onchange} />
                        </div>
                        <button disabled={note.title.length < 3 || note.description.length < 20} type="button" className="btn btn-primary" onClick={handleaddnoteclick}><i className="fa-regular fa-file-plus"></i>Add Note</button>
                  </div>
            </div>
      )
}

export default AddNote
