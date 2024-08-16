import React from "react";
import ShopSailBoats from "../../assets/shopSailBoats.jpg";
import ShopYachts from "../../assets/shopYacths.jpg";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{ backgroundImage: `url(${ShopSailBoats})` }}
        >
          <a>Sailing Boats</a>
        </div>

        <div className="item" style={{ backgroundImage: `url(${ShopYachts})` }}>
          <a>Yachts</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
