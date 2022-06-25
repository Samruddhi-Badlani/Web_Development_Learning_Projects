import React from "react";
import NoteContext from "../context/notes/noteContext";
import { useContext } from "react";

const NoteItem = (props) => {
  const { title, description,_id } = props.note;
  const {updateNote} = props;

  const context = useContext(NoteContext);
  const {deleteNote} = context;
  const handleDelete = (_id) =>{

    deleteNote(_id);

  }

  return (
    <div className="col-md-4">
     

      <div className="card my-3">
        
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
           {description}
          </p>
       
          <i className="fa fa-trash mx-2" aria-hidden="true" onClick={()=>handleDelete(_id)}></i>
          <i className="fa fa-pencil-square-o mx-2" aria-hidden="true" onClick={() =>{updateNote(props.note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
