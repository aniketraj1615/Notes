
import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';


export default function (props) {
   
    const navigate=useNavigate();


    const context = useContext(noteContext);
    const { notes, getNote, editNote } = context;

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }

    const updateNote = (current_note) => {
        setNote({
            id: current_note._id,
            etitle: current_note.title,
            edescription: current_note.description,
            etag: current_note.tag
        });
        setShowModal(true);
    }

    const handleClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        setShowModal(false);
        props.showAlert("Updated Successfully","success")
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNote();
        }
        else{
            navigate("/login");

        }
        
    }, []);

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <AddNote showAlert={props.showAlert} />

            <button type="button" className="btn btn-primary d-none" onClick={() => setShowModal(true)}>
                Launch demo modal
            </button>

            {showModal && (
                <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                                <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type="text" name="etitle" defaultValue={note.etitle} onChange={handleChange} placeholder="Title" minLength={5} required />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control type="text" name="edescription" defaultValue={note.edescription} onChange={handleChange} placeholder="Description" minLength={5} required />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Tag</Form.Label>
                                        <Form.Control type="text" name="etag" defaultValue={note.etag} onChange={handleChange} placeholder="Tag" />
                                    </Form.Group>
                                </Form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="button" disabled={note.etitle.length<5 || note.edescription.length<5}  className="btn btn-primary" onClick={handleClick}>Update Note</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='row my-3'>
                <h2>Your note</h2>
                <div className='container my-2 mx-2'>
                {notes.length===0&& 'No notes to display'}
                </div>
               
                {notes && notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                })}
            </div>
        </>
    )
}
