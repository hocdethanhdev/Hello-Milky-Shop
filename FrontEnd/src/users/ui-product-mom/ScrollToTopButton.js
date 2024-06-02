import React, { useState, useEffect } from 'react';
import './ScrollToTopButton.css';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 100) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className="btn-scrollTop" onClick={scrollToTop} style={{ display: isVisible ? 'block' : 'none' }}>
            <img src="https://media.shoptretho.com.vn/upload/arrow-up.png" alt="Scroll to top" style={{ height: '50px', width: '50px' }} />
        </div>
    );
};

export default ScrollToTopButton;
