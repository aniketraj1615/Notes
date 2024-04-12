import React, { useState} from 'react'


import Notes from './Notes';
import AddNote from './AddNote';
export default function Home(props) {
  const {showAlert}=props;
  // const { notes } = useContext(noteContext);
  return (
   <div>
    
    <Notes showAlert={showAlert}/>
   </div>
  )
}
