import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {

  const host = "http://localhost:5000";
  const notesInitial = [];

  const getAllNotes = async () =>{

    let url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token'),
        "auth-token-pg":localStorage.getItem('token2')
      },
     
    });

    const json = await response.json();
    console.log(json);
    setNotes(json['notesPostgres']);

  }

  const [notes, setNotes] = useState(notesInitial);

  // Add a Note
  const addNote = async (title, description, tag) => {


    // API CALL
    let url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token'),
        "auth-token-pg":localStorage.getItem('token2')
      },
      body: JSON.stringify({title,description,tag})
    });

    const json =  await response.json();
    console.log(json);
    console.log("Adding a noTe");
    // let note = {
    //   _id: "62b55e10a86a4376787f1bbc",
    //   user: "62b3689e765ffba9bd2d0d1d",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2022-06-24T06:47:44.175Z",
    //   __v: 0,
    // };
    // setNotes(notes.concat(note));
    getAllNotes();
  };

  // Delete a Note
  const deleteNote = async (_id) => {

    let url = `${host}/api/notes/deletenote/${_id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token'),
        "auth-token-pg":localStorage.getItem('token2')
      },
     
    });
    const json = await response.json();
    console.log(json);


    console.log("Deleting note with id ", _id);
    getAllNotes();
  };

  // Edit a node
  const editNote = async (_id, title, description, tag) => {
    // API Call

    let url = `${host}/api/notes/updatenote/${_id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : localStorage.getItem('token'),
        "auth-token-pg":localStorage.getItem('token2')
      },
      body : JSON.stringify({title,description,tag})
    });

    const json =  await response.json();
    console.log(json);
    getAllNotes();
  };

  return (
    <NoteContext.Provider
      value={{ notes, setNotes, addNote, deleteNote, editNote,getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
