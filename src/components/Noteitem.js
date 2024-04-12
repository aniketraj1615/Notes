import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

import Card from 'react-bootstrap/Card';
export default function Noteitem(props) {
    const context=useContext(noteContext);
 const {deleteNote}=context;

    const {note,updateNote}=props;
  return (
    <div className='col-md-4 my-3'>
        
        
        <Card>
      
      <Card.Body>
        <Card.Title>{note.title}</Card.Title>
        <Card.Text>
        {note.description}
        </Card.Text>
        <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);        props.showAlert("Deleted Successfully","success");
}}></i>
        <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note);
}}></i>
        
      </Card.Body>
    </Card>
      
    </div>
  )
}
