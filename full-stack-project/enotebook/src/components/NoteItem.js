import React from "react";
import { Link } from "react-router-dom";

const NoteItem = (props) => {
  const { title, description, date } = props.note;

  return (
    <div className="col-md-4">
     

      <div className="card my-3">
        
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
           {description}
          </p>
       
          <i className="fa fa-trash mx-2" aria-hidden="true"></i>
          <i className="fa fa-pencil-square-o mx-2" aria-hidden="true"></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
