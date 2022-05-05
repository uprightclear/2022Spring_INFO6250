import React from "react";
import husky from '../pics/Husky.png'
import '../CSS/Header.css'
import {Link} from "react-router-dom"


function Header(){
    return(
        <div className="header">
          <Link to="/"><img src={husky} className="img-logo" alt="logo"/></Link>
          <Link to="/" className='title' ><h1>Northeastern University<br></br>Student Center</h1></Link>
      </div>
    );
}

export default Header;