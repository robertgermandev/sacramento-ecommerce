import React from "react";
import ShopSailBoats from "../../assets/shopSailBoats.jpg";
import ShopYachts from "../../assets/shopYacths.jpg";
import "./styles.scss";
import { Link } from "react-router-dom";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="wrap">
        <div
          className="item"
          style={{ backgroundImage: `url(${ShopSailBoats})` }}
        >
          <Link to="/search/sailing-boats">Sailing boats</Link>
        </div>

        <div className="item" style={{ backgroundImage: `url(${ShopYachts})` }}>
          <Link to="/search/yachts">Yachts</Link>
        </div>
      </div>
    </div>
  );
};

export default Directory;
