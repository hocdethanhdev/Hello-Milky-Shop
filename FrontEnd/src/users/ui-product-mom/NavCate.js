import React, { useState } from "react";
import "./NavCate.css"; // Assume styles are defined in NavCate.css or you can use inline styles
import { useSelector } from "react-redux";

const NavCate = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);

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
                      <a href="/Bigsales" className="cate_li_title">
                        <img
                          className="img_icon icon_color"
                          // src="https://shoptretho.com.vn/Content/images/khuyen-mai.png?mode=max&width=60&height=60"
                          src="./khuyenmailon/ngoi-sao.jpg"
                          alt="Khuyến mại lớn"
                        />
                        <img
                          className="img_icon icon_hover"
                          src="./khuyenmailon/ngoi-sao.jpg"
                          alt="Khuyến mại lớn"
                        />
                        {/* <span className="phan-tram-km-lon fas fa-percentage"></span> */}
                        Khuyến mại lớn
                      </a>
                    </li>
                    <li className="cate_li menu-30">
                      <a href="/sua-cho-me" className="cate_li_title">
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
                      </a>
                    </li>
                    <li className="cate_li menu-66569036">
                      <a href="/sua-cho-be" className="cate_li_title">
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
                      </a>
                    </li>
                    {isLoggedIn ? (
                      <li className="cate_li menu-57412712">
                        <a href="/Voucher" className="cate_li_title">
                          <img
                            className="img_icon icon_color"
                            src="https://cdn-icons-png.flaticon.com/512/869/869649.png"
                            alt="Voucher"
                          />
                          <img
                            className="img_icon icon_hover"
                            src="https://cdn-icons-png.flaticon.com/512/869/869649.png"
                            alt="Voucher"
                          />
                          Voucher
                        </a>
                      </li>
                    ) : (
                      <div></div>
                    )}

                    <li className="cate_li menu-2011021743240">
                      <a href="/News" className="cate_li_title">
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
                      </a>
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
