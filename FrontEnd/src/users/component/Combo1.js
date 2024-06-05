import React from "react";
import "./Product1.css";

function Combo1() {
    return(
        <section id="combo_1f" className="combo-1f-section">
        <div className="combo-1f-wrap ">
          <div className="combo-1f-content">
            <div className="combo-1f-header">
              <div className="combo-1f-icon">
                <img src=".//ImageMilkShop/icon2.png" alt="Combo icon" />
              </div>
              <div className="combo-1f-title">
                <h2>Sữa dành cho mẹ</h2>
              </div>
            </div>
            <div className="combo-1f-main">
              <img src=".//ImageMilkShop/banner-tang.png" alt="Combo siêu tiết kiệm" />
            </div>
            <div className="combo-content">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="combo-item">
                  <img src=".//ImageMilkShop/aptakid.jpg" alt={`Combo ${index + 1}`} />
                  <div className="combo-details">
                    <h3>Combo đi sinh tiêu chuẩn</h3>
                    <p>2.266.000đ</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    );

}
export default Combo1;