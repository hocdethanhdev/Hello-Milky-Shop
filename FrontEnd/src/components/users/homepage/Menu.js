import React from "react";
import { TiThMenu } from "react-icons/ti";
import "./Menu.css";

function Menu() {
  return (
    <div className="menu_cate-trid">
      <table className="category_table-trid">
        <thead>
          <tr>
            <th className="danhmuc-trid">
              <div className="icon_danhmuc-trid">
                <TiThMenu />
              </div>
              Danh mục
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="/Bigsales" className="cate_li_title-trid">
                <img
                  className="img_icon-trid icon_hover-trid"
                  src="./khuyenmailon/ngoi-sao.jpg"
                  alt="Khuyến mại lớn"
                />
                Khuyến mại lớn
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="/sua-cho-me" className="cate_li_title-trid">
                <img
                  className="img_icon-trid icon_hover-trid"
                  src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                  alt="Đồ dùng cho mẹ"
                />
                Sữa cho mẹ
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="/sua-cho-be" className="cate_li_title-trid">
                <img
                  className="img_icon-trid icon_hover-trid"
                  src="https://momslove.com.vn/wp-content/uploads/2021/07/icon-sua.svg"
                  alt="Sữa cho bé"
                />
                Sữa cho bé
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="/News" className="cate_li_title-trid">
                <img
                  className="img_icon-trid icon_hover-trid"
                  src="./news.png"
                  alt="Tin tức"
                />
                Tin tức
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Menu;
