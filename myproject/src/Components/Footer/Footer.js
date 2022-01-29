import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
    return (
        <footer
            className="footer"
        >
            <div
                className="contact-details-container"
            >
                <div>
                    Contact Details
                </div>
                <div>
                    <span>Email: </span>tejashreepatil2623@gmail.com
                </div>
                <div>
                    <span>Linked In: </span> www.linkedin.com/in/tejashree-patil/
                </div>

            </div>
            <div
                className="privacy-disclaimer-link-container"
            >
                <Link
                    style={{
                        color: 'white'
                    }}
                    to="/privacy-policy"
                >
                    Privacy Policy
                </Link>
                <Link
                    style={{
                        color: 'white'
                    }}
                    to="/disclaimer"
                >
                    Disclaimer
                </Link>
            </div>

        </footer>
    )
};

export default Footer;
