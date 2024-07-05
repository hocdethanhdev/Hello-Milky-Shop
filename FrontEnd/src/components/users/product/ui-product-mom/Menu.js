import React from "react";
import { TiThMenu } from "react-icons/ti";
import './Product1.css';
function Menu() {
  return (

    <div className="menu_cate">
      <table className="category_table">
        <thead>
          <tr>
            <th className="danhmuc">
              <div className="icon_danhmuc">
                <TiThMenu />
              </div>
              Danh mục
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link to="KhuyenMaiLon.html" className="cate_li_title">
                <img
                  className="img_icon icon_hover"
                  src="https://shoptretho.com.vn/Content/images/khuyen-mai.png?mode=max&width=60&height=60"
                  alt="Khuyến mại lớn"
                />
                Khuyến mại lớn
              </Link>
            </td>
          </tr>

          <tr>
            <td>
              <Link to="SuaChoMe.html" className="cate_li_title">
                <img
                  className="img_icon icon_hover"
                  src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                  alt="Đồ dùng cho mẹ"
                />
                Sữa cho mẹ
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="SuaChoBe.html" className="cate_li_title">
                <img
                  className="img_icon icon_hover"
                  src="https://media.shoptretho.com.vn/upload/image/menu/20150803/do-dung-cho-me-1.png?mode=max&width=60&height=60"
                  alt="Đồ dùng cho mẹ"
                />
                Sữa cho bé
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/Voucher" className="cate_li_title">
                <img
                  className="img_icon icon_hover"
                  src="D:\demotest\public\ImageMilkShop\CreateVoucher.jpg"
                  alt="Voucher"
                />
                Voucher
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/" className="cate_li_title">
                <img
                  className="img_icon icon_hover"
                  src="./news.png"
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
