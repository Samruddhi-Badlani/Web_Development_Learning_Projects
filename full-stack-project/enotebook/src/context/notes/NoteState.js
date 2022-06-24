import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) =>{

    const notes  = [
        {
          "_id": "62b3690e765ffba9bd2d0d21",
          "user": "62b3689e765ffba9bd2d0d1d",
          "title": "Nehal Post",
          "description": "Hello this is post by nehal",
          "tag": "rate-nehal",
          "date": "2022-06-22T19:10:06.224Z",
          "__v": 0
        },
        {
          "_id": "62b55df1a86a4376787f1bb8",
          "user": "62b3689e765ffba9bd2d0d1d",
          "title": "Nehal Post 2",
          "description": "Hello this is second post by nehal",
          "tag": "rate-nehal-2",
          "date": "2022-06-24T06:47:13.236Z",
          "__v": 0
        },
        {
          "_id": "62b55e00a86a4376787f1bba",
          "user": "62b3689e765ffba9bd2d0d1d",
          "title": "Nehal Post 3",
          "description": "Hello this is third post by nehal",
          "tag": "rate-nehal-3",
          "date": "2022-06-24T06:47:28.523Z",
          "__v": 0
        },
        {
          "_id": "62b55e10a86a4376787f1bbc",
          "user": "62b3689e765ffba9bd2d0d1d",
          "title": "Nehal Post 4",
          "description": "Hello this is fourth post by nehal",
          "tag": "rate-nehal-4",
          "date": "2022-06-24T06:47:44.175Z",
          "__v": 0
        }
      ]


   

    return (
        
        <NoteContext.Provider>
            {props.children}
        </NoteContext.Provider>
        
    )

}

export default NoteState;