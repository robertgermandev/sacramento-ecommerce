import React from "react";
import "./styles.scss";

const Button = ({ children, ...otherProps }) => {
  return (
    <button className="btn" {...otherProps}>
      <div className="children">{children}</div>
    </button>
  );
};

export default Button;
