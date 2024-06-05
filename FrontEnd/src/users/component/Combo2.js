import React from "react";
import "./Product1.css";

function Combo2 () {
    return(
        <section id="combo_2f" className="combo-2f-section">
        <div className="combo-2f-wrap ">
          <div className="combo-2f-content">
            <div className="combo-2f-header">
              <div className="combo-2f-icon">
                <img src=".//ImageMilkShop/icon2.png" alt="Combo icon" />
              </div>
              <div className="combo-2f-title">
                <h2>Sữa dành cho bé</h2>
              </div>
            </div>
            <div className="combo-2f-main">
              <img src=".//ImageMilkShop/banner-tang.png" alt="Combo siêu tiết kiệm" />
            </div>
            <div className="combo-content-1">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="combo-item-1">
                  <img src=".//ImageMilkShop/aptakid.jpg" alt={`Combo ${index + 1}`} />
                  <div className="combo-details-1">
                    <h3>Combo đi sinh tiêu chuẩn</h3>
                    <p>2.266.000đ</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    ) ;
}

export default Combo2;