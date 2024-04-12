import React, { useState,useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import noteContext from '../context/notes/noteContext';



export default function AddNote(props) {
    
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        console.log("handleClick called");
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""});
        props.showAlert("Added Successfully","success")
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }
  return (
    <div>
      <h2>Add a note</h2>
      <Form>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text"name="title" id="title" value={note.title} onChange={onchange} placeholder="Title" minLength={5} required />
        
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" onChange={onchange} value={note.description} id="description" name="description" placeholder="Description" minLength={5} required />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Tag</Form.Label>
        <Form.Control type="text" onChange={onchange} value={note.tag} id="tag" name="tag" placeholder="Tag" />
      </Form.Group>
      <Button variant="primary" disabled={note.title.length<5 || note.description.length<5} onClick={handleClick} type="submit">
        Add Note
      </Button>
    </Form>
     
    </div>
  )
}
