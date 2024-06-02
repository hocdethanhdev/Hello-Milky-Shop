import React, { useState, useEffect } from 'react';
import './Footer.css';

function Footer() {
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScroll = () => {
        // Khoảng cách người dùng đã cuộn từ đỉnh của trang
        const scrollDistance = window.scrollY;

        // Hiển thị nút khi khoảng cách cuộn lớn hơn 500px
        if (scrollDistance > 100) {
            setShowScrollButton(true);
        } else {
            setShowScrollButton(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer>
            <div className="footer-container">
                <p>&copy; Hello Milky Shop. All rights reserved.</p>
                <div className="social-links">
                    <a href="#" className="social-link"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-instagram"></i></a>
                    <a href="#" className="social-link"><i className="fab fa-twitter"></i></a>
                </div>
            </div>
            {/* Hiển thị nút cuộn lên khi showScrollButton là true */}
            {showScrollButton && (
                <button className="scroll-to-top-button" onClick={scrollToTop}>
                    <i className="fas fa-arrow-up"></i>
                </button>
            )}
        </footer>
    );
}

export default Footer;
