import React from "react";
import "./ListProductMomScreen.css";
import { Link } from "react-router-dom";
import NavCate from "../ui-product-mom/NavCate";
import ListProductBb from "./ListProductBb";

function ListProductBbScreen() {
  return (
    <div>
      <div className="url-list">
        <NavCate />
        <div className="breadcrumb-area-thinh-url">
          <div className="container-thinh-url">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap-thinh-url">
                  <nav aria-label="breadcrumb-thinh-url">
                    <ul className="breadcrumb-thinh-url">
                      <li className="breadcrumb-item-thinh-url">
                        <Link to="/">
                          <i className="fa fa-home"></i>
                        </Link>
                      </li>
                      <li
                        className="breadcrumb-item-thinh-url active"
                        aria-current="page">
                        Sữa cho bé
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="main-product-listmom-thinh-screen">
        <ListProductBb />
      </div>
    </div>
  );
}

export default ListProductBbScreen;
