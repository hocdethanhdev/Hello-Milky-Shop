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
            <img className="nut-scroll-thinh" src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2Farrow-up.png?alt=media&token=b4f15e47-12ef-48da-b7cd-c592c1b830bd" alt="Scroll to top" style={{ height: '50px', width: '50px' }} />
        </div>
    );
};


export default ScrollToTopButton;
