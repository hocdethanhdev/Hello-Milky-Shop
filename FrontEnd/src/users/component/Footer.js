import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer-tri-container">
                <p>&copy; Hello Milky Shop. All rights reserved.</p>
                <div className="social-links-tri">
                    <a href="#">Facebook</a>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
