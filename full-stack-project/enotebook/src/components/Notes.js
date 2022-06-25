import React from "react";
import { useContext,useState } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useEffect } from "react";
import { useRef } from "react";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getAllNotes,editNote } = context;

  const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:"default"});

  const ref = useRef("");
  const refClose = useRef("");

  const updateNote = (currentNote) => {
    
    setNote({id:currentNote._id,  etitle :currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    
    ref.current.click();
  };

  const handleClick = (e) =>{

    e.preventDefault();

    console.log("Updating now....",note)
    editNote(note.id,note.etitle,note.edescription,note.etag)
    ref.current.click();

    


}

const onChange = (e) =>{


    setNote({...note,
        [e.target.name] : e.target.value
        
    })

}

  useEffect(() => {
    getAllNotes();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <AddNote />

      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3 ">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={onChange}
                    value={note.etag}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref = {refClose}
              >
                Close
              </button>
              <button disabled={note.etitle.length < 5 || note.edescription.length <5} onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>

        <div className="container mx-2">

        {notes.length === 0 && <h4>You have no notes yet !! Add a note to get started</h4>}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
