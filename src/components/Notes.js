import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = (props) => {
      const context = useContext(noteContext);
      const { notes, getNotes, editNote } = context;
      let navigate = useNavigate();
      useEffect(() => {
            if (localStorage.getItem('token')) {
                  getNotes();
            }
            else {
                  props.showAlert("Login Required to access Note", "danger");
                  navigate("/login");
            }
            // eslint-disable-next-line
      }, [])

      const ref = useRef(null);
      const refClose = useRef(null);
      const [note, setNote] = useState({ id: "", newTitle: "", newDescription: "", newTag: "" })

      const updateNote = (currentNote) => {
            ref.current.click();
            setNote({ id: currentNote._id, newTitle: currentNote.title, newDescription: currentNote.description, newTag: currentNote.tag });
      }

      const handleupdatenoteclick = (e) => {
            editNote(note.id, note.newTitle, note.newDescription, note.newTag);
            refClose.current.click();
            props.showAlert("Updated Successfully", "success")
      }

      const onchange = (e) => {
            setNote({ ...note, [e.target.name]: e.target.value })
      }

      return (
            <>
                  <AddNote showAlert={props.showAlert} />
                  <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Launch demo modal
                  </button>

                  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                              <div className="modal-content">
                                    <div className="modal-header">
                                          <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                          <div className="container">
                                                <div className="container">
                                                      <div className="mb-3">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                                                            <input type="text" className="form-control" id="newTitle" name="newTitle" placeholder="Enter Your Title" value={note.newTitle} onChange={onchange} minLength={3} required />
                                                      </div>
                                                      <div className="mb-3">
                                                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                                                            <textarea className="form-control" id="newDescription" name="newDescription" placeholder="Enter Your Description" rows="4" value={note.newDescription} onChange={onchange} minLength={20} required ></textarea>
                                                      </div>
                                                      <div className="mb-3">
                                                            <label htmlFor="exampleFormControlInput1" className="form-label">Tag</label>
                                                            <input type="text" className="form-control" id="newTag" name="newTag" placeholder="Enter Your Tag" value={note.newTag} onChange={onchange} />
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="modal-footer">
                                          <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                          <button disabled={note.newTitle.length < 3 || note.newDescription.length < 20} onClick={handleupdatenoteclick} type="button" className="btn btn-primary">Update Note</button>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className='row my-3'>
                        <div className='d-flex flex-row justify-content-between'>
                              <h1>Your Notes</h1>
                              <form className="d-flex" role="search">
                                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                              </form>
                        </div>
                        {notes.length === 0 && "No notes to display"}
                        {Array.isArray(notes) && notes.map((note) => {
                              return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />;
                        })}
                  </div>
            </>
      )
}

export default Notes
