import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css"

export default function Footer() {
    return (
        <div className="flex">
            <p className="text">Made by Shon Purdy</p>
            <a href="https://www.instagram.com/shonith/" target="_blank" className="footer-links"><FontAwesomeIcon icon={ faInstagram } /></a>
            <a href="https://twitter.com/ShonPurdy" target="_blank" className="footer-links"><FontAwesomeIcon icon={ faTwitter } /></a>
            <a href="https://github.com/shonith17" target="_blank" className="footer-links"><FontAwesomeIcon icon={ faGithub } /></a>
        </div>
        
    )
}