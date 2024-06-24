import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './sidebarprofile.css';

function SidebarProfile() {
  const [dropdownActive, setDropdownActive] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sidebar">
      
      <nav>
        <ul>
          <li className="dropdown-parent" onClick={() => setDropdownActive(!dropdownActive)} ref={dropdownRef}>
            <Link to="/account" className="dropdown-link">Tài Khoản Của Tôi</Link>
            <ul className={`dropdown ${dropdownActive ? 'dropdown-active' : ''}`}>
              <li><Link to="/account">Hồ Sơ</Link></li>
              <li><Link to="/ChangePassword">Đổi mật khẩu</Link></li>
              <li><Link to="/Address">Địa chỉ</Link></li>
              {/* Thêm các liên kết khác nếu cần */}
            </ul>
          </li>
          <li>
            <Link to="/profile">Đơn mua</Link>
          </li>
          {/* Thêm các liên kết khác nếu cần */}
        </ul>
      </nav>
    </div>
  );
}

export default SidebarProfile;
