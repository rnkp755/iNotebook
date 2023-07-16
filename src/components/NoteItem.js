import React, { useContext } from 'react';
import noteContext from "../context/notes/noteContext";

function NoteItem(props) {
      const context = useContext(noteContext);
      const { deleteNote } = context;
      const { note, updateNote } = props;
      return (
            <div className="col-md-4 my-3">
                  <div className="card mb-3">
                        <div className="row g-0">
                              <div>
                                    <div className="card-body">
                                          <div className="card-header">
                                                <h5>{note.title}</h5>
                                          </div>
                                          <span className="badge bg-primary">{note.tag}</span>
                                          <p className="card-text">{note.description}</p>
                                          <p className="card-text"><small className="text-body-secondary">Added on {note.date}</small></p>
                                          <i className="fa-solid fa-pen mx-2" onClick={() => { updateNote(note) }}></i>
                                          <i className="fa-solid fa-trash mx-2" onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully", "success") }}></i>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div >
      )
}

export default NoteItem
