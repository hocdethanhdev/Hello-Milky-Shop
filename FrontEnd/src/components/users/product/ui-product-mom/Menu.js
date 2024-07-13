import React from "react";
import { TiThMenu } from "react-icons/ti";
import './Product1.css';
import { useTranslation } from 'react-i18next';
function Menu() {
  const { t } = useTranslation();

  return (
    <div className="menu_cate">
      <table className="category_table">
        <thead>
          <tr>
            <th className="danhmuc">
              <div className="icon_danhmuc">
                <TiThMenu />
              </div>
              {t('menu')}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Link to="KhuyenMaiLon.html" className="cate_li_title">
                <img
                  className="img_icon icon_hover"
                  src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2Fkhuyen-mai.png?alt=media&token=f9130601-0917-4f43-9386-b2ef5a6ae5ac"
                  alt="Khuyến mại lớn"
                />
                {t('bigSales')}
              </Link>
            </td>
          </tr>

          <tr>
            <td>
              <Link to="SuaChoMe.html" className="cate_li_title">
                <img
                  className="img_icon icon_hover"
                  src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2Fdo-dung-cho-me-1.png?alt=media&token=7d86a69a-f13b-4572-a873-ed8b35a0de38"
                  alt="Đồ dùng cho mẹ"
                />
                {t('milkForMom1')}
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="SuaChoBe.html" className="cate_li_title">
                <img
                  className="img_icon icon_hover"
                  src="https://momslove.com.vn/wp-content/uploads/2021/07/icon-sua.svg"
                  alt="Đồ dùng cho mẹ"
                />
                {t('milkForBaby1')}
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to="/Voucher" className="cate_li_title">
                <img
                  className="img_icon icon_hover"
                  src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FCreateVoucher.jpg?alt=media&token=5ed62db9-4b35-4384-9308-64e91012bf41"
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
                  src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2Fnews.png?alt=media&token=3cf9cab0-717d-4288-8dcb-bd2cd0e499f4"
                  alt="Tin tức"
                />
                {t('news')}
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  );
}
export default Menu;
