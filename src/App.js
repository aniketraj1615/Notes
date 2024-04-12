import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Notes from './components/Notes';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <NoteState>
    <Router>
<Alert alert={alert}/>
      <Navbar/>
      {/* <Alert message={"aniket"}/> */}
      <div className='container'>
        <Routes>
          <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
          <Route exact path="/About" element={<About/>}/>
          <Route exact path="/Login" element={<Login showAlert={showAlert}/>}/>
          <Route exact path="/Signup" element={<Signup showAlert={showAlert}/>}/>
          
        </Routes>
        </div>
      
    </Router>
     </NoteState> 
  );
}

export default App;
