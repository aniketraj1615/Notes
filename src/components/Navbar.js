
import React, { useEffect } from 'react';
import { Link, useLocation ,useNavigate} from 'react-router-dom';
  

export default function Navbar() {
  const navigate=useNavigate();

  const handleLogout=()=>{
localStorage.removeItem('token');
navigate("/Login");

  }
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Inotebook</Link>
          
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link  ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link  ${location.pathname==="/About"?"active":""}`} aria-current="page" to="/About">About</Link>
              </li>
            </ul>
            
           {!localStorage.getItem('token')? <div >

           <Link className='btn btn-primary mx-2' to="/Login">Login</Link>
           <Link className='btn btn-primary mx-2' to="/Signup">Signup</Link>
</div>:           <Link className='btn btn-primary mx-2' onClick={handleLogout}>Logout</Link>}

          </div>
        </div>
      </nav>
    </div>
  );
}
