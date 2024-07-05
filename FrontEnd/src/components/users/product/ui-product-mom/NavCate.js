import React, { useState } from "react";
import "./NavCate.css";
import { Link } from "react-router-dom";

const NavCate = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="nav_cate width-common">
      <ul>
        <li
          className="cate_home nav_top"
          onMouseEnter={() => setShowMenu(true)}
          onMouseLeave={() => setShowMenu(false)}
        >
          <i className="fa fa-bars"></i>Danh mục
          {showMenu && (
            <div className="box_list_cate">
              <div className="menu_cate-thinh">
                <div>
                  <ul>
                    <li className="cate_li menu-30">
                      <Link to="/Bigsales" className="cate_li_title">
                        <img
                          className="img_icon icon_color"
                          src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2Fkhuyen-mai.png?alt=media&token=2d072039-d089-4da5-bd04-e43c01d80113"
                          alt="Khuyến mại lớn"
                        />
                        <img
                          className="img_icon icon_hover"
                          src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2Fkhuyen-mai.png?alt=media&token=2d072039-d089-4da5-bd04-e43c01d80113"
                          alt="Khuyến mại lớn"
                        />
                        Khuyến mại lớn
                      </Link>
                    </li>
                    <li className="cate_li menu-30">
                      <Link to="/sua-cho-me" className="cate_li_title">
                        <img
                          className="img_icon icon_color"
                          src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                          alt="Sữa cho mẹ"
                        />
                        <img
                          className="img_icon icon_hover"
                          src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                          alt="Sữa cho mẹ"
                        />
                        Sữa cho mẹ
                      </Link>
                    </li>
                    <li className="cate_li menu-66569036">
                      <Link to="/sua-cho-be" className="cate_li_title">
                        <img
                          className="img_icon icon_color"
                          src="https://momslove.com.vn/wp-content/uploads/2021/07/icon-sua.svg"
                          alt=" Sữa cho bé"
                        />
                        <img
                          className="img_icon icon_hover"
                          src="https://momslove.com.vn/wp-content/uploads/2021/07/icon-sua.svg"
                          alt=" Sữa cho bé"
                        />
                        Sữa cho bé
                      </Link>
                    </li>


                    <li className="cate_li menu-2011021743240">
                      <Link to="/News" className="cate_li_title">
                        <img
                          className="img_icon icon_color"
                          src="https://raw.githubusercontent.com/hocdethanhdev/Hello-Milky-Shop/main/FrontEnd/public/news.png?token=GHSAT0AAAAAACSSV3OT5ZRWNUSLY3IVED5SZSW24UQ"
                          alt="Tin tức"
                        />
                        <img
                          className="img_icon icon_hover"
                          src="https://raw.githubusercontent.com/hocdethanhdev/Hello-Milky-Shop/main/FrontEnd/public/news.png?token=GHSAT0AAAAAACSSV3OT5ZRWNUSLY3IVED5SZSW24UQ"
                          alt="Tin tức"
                        />
                        Tin tức
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </li>

      </ul>
    </div>
  );
};

export default NavCate;
