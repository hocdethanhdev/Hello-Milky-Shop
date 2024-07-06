import React from "react";
import { TiThMenu } from "react-icons/ti";
import "./Menu.css";
import { Link } from 'react-router-dom';

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
              <Link to="/Bigsales" className="cate_li_title-trid">
                <img
                  className="img_icon-trid icon_hover-trid"
                  src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2Fngoi-sao.jpg?alt=media&token=712904a9-b3f7-46ea-93f3-bfc58f575d95"
                  alt="Khuyến mại lớn"
                />
                Khuyến mại lớn
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/sua-cho-me" className="cate_li_title-trid">
                <img
                  className="img_icon-trid icon_hover-trid"
                  src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2Fdo-dung-cho-me-1.png?alt=media&token=7d86a69a-f13b-4572-a873-ed8b35a0de38"
                  alt="Đồ dùng cho mẹ"
                />
                Sữa cho mẹ
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/sua-cho-be" className="cate_li_title-trid">
                <img
                  className="img_icon-trid icon_hover-trid"
                  src="https://momslove.com.vn/wp-content/uploads/2021/07/icon-sua.svg"
                  alt="Sữa cho bé"
                />
                Sữa cho bé
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/News" className="cate_li_title-trid">
                <img
                  className="img_icon-trid icon_hover-trid"
                  src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2Fnews.png?alt=media&token=3cf9cab0-717d-4288-8dcb-bd2cd0e499f4"
                  alt="Tin tức"
                />
                Tin tức
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Menu;
