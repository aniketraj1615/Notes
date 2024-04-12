import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";
const NoteState=(props)=>{
    const host ="http://localhost:3002"
   

const notesInitial=[]
  const [notes,setNotes]=useState(notesInitial);


   //1.Get all notes
   
const getNote=async()=>{
   
    //Api call for fetch all notes
    const response = await fetch(`${host}/api/notes/getallnotes`, {
        method: "GET",
        
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
          
        }
        
        
      });
      const json=await response.json();
      console.log(json);
      setNotes(json);
    }
// const json=response.json();




  //2.Add a new note
  const addNote = async (title, description, tag) => {
    // Api call for adding a new note
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      mode: "cors", // Switched to "cors" mode
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }) // Construct object and stringify
    });
  // const json=await response.json();
  // console.log(json);
    // Logic for handling the response can be added here
    console.log("Adding a new note");
  
    // Example response handling
    if (response.ok) {
      const note = await response.json(); // Assuming the response contains the newly created note
      setNotes(notes.concat(note));
    } else {
      console.error("Failed to add note:", response.status);
      // Handle the error appropriately
    }
  };


//3.Delete a note
const deleteNote=async(id)=>{
    
 //Api call for deleting a note
 const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
  method: "DELETE",
  
  headers: {
    "Content-Type": "application/json",
    "auth-token":localStorage.getItem('token')
    
  },
  
  
});
const json=response.json();
  console.log(json);




    console.log("deleting note with id"+id);
    const newNotes=notes.filter((note)=>{return note._id!==id})
    setNotes(newNotes)
}


//4.Edit a note
const editNote=async(id,title,description,tag)=>{
    //Api call for editing a note
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token')
          
        },
        
        body: JSON.stringify({title,description,tag})
      });
const json= await response.json();
console.log(json);

    //Logic for edit notes
    console.log("editing a note");
    let newNotes=JSON.parse(JSON.stringify(notes));
    for(let index=0;index<newNotes.length;index++){
        const element=newNotes[index];
        if(element._id===id){
          newNotes[index].title=title;
          newNotes[index].description=description;

          newNotes[index].tag=tag;

          break;
        }
        
    }
    setNotes(newNotes);

}




  return(
    <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNote}}>
        {props.children}
    </NoteContext.Provider>
)
}
export default NoteState;