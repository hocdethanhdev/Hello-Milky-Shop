import React, { useEffect } from "react";
import { MDBFooter, MDBContainer, MDBRow, MDBIcon } from "mdb-react-ui-kit";
import "./Footer.css";
import ScollToTopButton from "../users/product/ui-product-mom/ScrollToTopButton";
import { Link } from "react-router-dom";

function Footer() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollDistance = window.scrollY;
      // Example logic for showing scroll button
      if (scrollDistance > 100) {
        // Implement logic if needed
      } else {
        // Implement logic if needed
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <div className="scoll-button-all"><ScollToTopButton /></div>
      <MDBFooter className="text-center text-lg-start text-dark bg-white zigzag-pattern">
        <section
          className="cho-no-nhay-len d-flex justify-content-center justify-content-lg-between p-4 mt-4"
          style={{ borderBottom: "1px solid #000" }}
        >
          <div className="me-5 d-none d-lg-block">
            <span className="text-dark">Hello Milky Shop</span>
          </div>

          <div>
            <Link to="https://www.facebook.com/profile.php?id=61561027203872" className="me-4 text-reset">
              <MDBIcon fab icon="facebook-f" />
            </Link>
            <Link to="https://www.google.com" className="me-4 text-reset">
              <MDBIcon fab icon="google" />
            </Link>
            <Link to="https://www.instagram.com" className="me-4 text-reset">
              <MDBIcon fab icon="instagram" />
            </Link>
          </div>
        </section>

        <section className="bg-white">
          <MDBContainer className="text-center mt-5">
            <MDBRow className="mt-3">
              <div className="in4 col-md-5">
                <h6 className="text-uppercase fw-bold mb-4 text-dark">
                  <MDBIcon fas icon="shopping-bag" className="me-3" />
                  Hello Milky Shop
                </h6>
                <p className="text-dark">Địa chỉ liên hệ</p>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.609941530484!2d106.80730807451795!3d10.841132857997918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgVFAuIEhDTQ!5e0!3m2!1svi!2s!4v1718555179040!5m2!1svi!2s"
                  className="embed-responsive-item"
                  title="Google Map"
                  allowFullScreen
                  style={{ border: 0, marginBottom: 20 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="contact col-md-7">
                <div className="text-footer">
                  <h6 className="text-uppercase-1 fw-bold mb-4 text-dark">
                    Contact
                  </h6>
                  <p className="text-dark">
                    <MDBIcon icon="home" className="me-2" />
                    Đại học FPT Thành phố Hồ Chí Minh
                  </p>
                  <p className="address">
                    Địa chỉ: Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố
                    Thủ Đức, Thành phố Hồ Chí Minh
                  </p>
                  <p className="text-dark">
                    <MDBIcon icon="envelope" className="me-3" />
                    passmonswp@gmail.com
                  </p>
                </div>
              </div>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4 fw-bold"
          style={{ backgroundColor: "#0f7fc1" }}
        >
          <span className="text-white">
            © 2024 Copyright: All rights reserved.
          </span>
        </div>
      </MDBFooter>
    </div>
  );
}

export default Footer;
