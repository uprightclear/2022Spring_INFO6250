import React, {useState} from "react";
import {Routes, Route, Link} from "react-router-dom"
import About from'./About'
import Home from './Home'
import News from './News'
import Faq from './Faq'
import Privacy from './Privacy'
import Login from './Login'
import Support from "./Support";
import '../CSS/Menubar.css'
import Survey from "./Survey";

function Menubar(){
    return(
        <div>
            <nav className="menubar">
                <ul className="menu">
                    <div className="navbar">
                    <Link className="main-menu" to="/"><li className="dropdown">Home</li></Link>
                    <Link className="main-menu" to="news"><li className="dropdown">News</li></Link>
                    <Link className="main-menu" to="support"><li className="dropdown">Support</li></Link>
                    <Link className="main-menu" to="faq"><li className="dropdown">FAQ</li></Link>
                    <Link className="main-menu" to="about"><li className="dropdown">About</li></Link>
                    <li className="dropdown" id="dropdown-l">
                        <button>More &#9662;</button>
                        <div className="dropmenu" id="left-dropmenu">
                        <ul className="dropdown-content">
                            <li><Link to="privacy">Privacy Policy</Link></li>
                            <li><a href="https://research.northeastern.edu/#_ga=2.25907069.1941757723.1650317195-1715126699.1628506811">Research Home</a></li>
                            <li><a href="https://research.northeastern.edu/about/themes/health/#_ga=2.25907069.1941757723.1650317195-1715126699.1628506811">Health</a></li>
                            <li><a href="https://research.northeastern.edu/about/themes/sustainability/#_ga=2.25907069.1941757723.1650317195-1715126699.1628506811">Sustainability</a></li>
                            <li><a href="https://research.northeastern.edu/about/themes/security/">Security</a></li>
                        </ul>
                        </div>
                    </li>
                    </div>
                    <div className="sign-in">
                        <li className="dropdown" id="dropdown-l">
                            <button>Student Hub&#9662;</button>
                            <div className="dropmenu" id="left-dropmenu">
                                <ul className="dropdown-content">
                                    <li><Link to="login">TodoList</Link></li>
                                    <li><Link to="survey">Course Survey</Link></li>
                                </ul>
                            </div>
                        </li>
                    </div>

                </ul>
            </nav>
            <div>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="about" element={<About/>}></Route>
                    <Route path="news" element={<News/>}></Route>
                    <Route path="faq" element={<Faq/>}></Route>
                    <Route path="support" element={<Support/>}></Route>
                    <Route path="privacy" element={<Privacy/>}></Route>
                    <Route path="login" element={<Login/>}></Route>
                    <Route path="survey" element={<Survey/>}></Route>
                </Routes>
            </div>
        </div>
    );
}

export default Menubar;