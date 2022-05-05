import React from "react";
import apple from "../pics/apple.svg"
import google from "../pics/google.svg"
import microsoft from "../pics/microsoft.svg"
import facebook from "../pics/facebook.svg"
import twitter from "../pics/twitter.svg"
import linkedin from "../pics/linkedin.svg"
import youtube from "../pics/youtube.svg"
import instagram from "../pics/instagram.svg"
import "../CSS/Footer.css"
import {Link} from "react-router-dom"


function Footer(){
    return(
        <footer className="site-footer">
            <div className="menus">
                <div className="menu-area">
                    <h4>Menu</h4>
                    <div className="menu-footer-main-container">
                        <ul className="menu">
                            <li><Link to="/">Home</Link></li>
                            <li><a href="news">News </a></li>
                            <li><a href="support">Support </a></li>
                            <li><Link to="faq">FAQ</Link></li>
                            <li><Link to="about">About</Link></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="members">
                    <h4>Contact</h4>
                    <p>Feel free to contact us! You will get response in 12 hours.</p>
                    <ul>
                        <li>
                            <a href="https://sun.jiq@northeastern.edu" target="_blank">sun.jiq@northeastern.edu</a>
                        </li>
                    </ul>
                </div>
                <div className="app">
                    <h4>Mobile App</h4>
                    <p>Use NEU Student App to start your fantastic school day!</p>
                    <a href="#">
                        <img src={apple}/>
                    </a>
                    <a href="#">
                        <img src={google}/>
                    </a>
                    <a href="#">
                        <img src={microsoft}/>
                    </a>
                </div>
                <div className="social">
                    <h4>Follow Us</h4>
                    <ul>
                        <li>
                            <a  href="https://www.facebook.com/northeastern/" target="_blank">
                                <img src={facebook}/>
                            </a>
                        </li>
                        <li>
                            <a  href="https://twitter.com/Northeastern" target="_blank">
                                <img src={twitter}/>
                            </a>
                        </li>
                        <li>
                            <a  href="https://www.youtube.com/user/Northeastern" target="_blank">
                                <img src={youtube}/>
                            </a>
                        </li>
                        <li>
                            <a  href="https://www.linkedin.com/school/northeastern-university/" target="_blank">
                                <img src={linkedin}/>
                            </a>
                        </li>
                        <li>
                            <a  href="https://www.instagram.com/northeastern/" target="_blank">
                                <img src={instagram}/>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="legal-wrap">
                <div className="legal">
                    <div className="copyright">
                        © 2022 Northeastern University, learn more about <a href="/privacy">Privacy Policy</a>
                    </div>
                </div>  
            </div>
        </footer>
    );
}

export default Footer;