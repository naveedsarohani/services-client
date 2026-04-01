import React from "react";

const Card = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  );
};

const Header = ({ icon, name, status }) => {
  return (
    <div className="card-header">
      <div className="card-title">
        <img src={icon} alt={name} className="w-8 h-8" />
        <h3>{name}</h3>
      </div>

      <span
        className={
          status === "connected"
            ? "status-connected"
            : "status-disconnected"
        }
      >
        ● {status === "connected" ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
};

const Body = ({ description }) => {
  return (
    <p className="card-description">
      {description}
    </p>
  );
};

const Footer = ({ checked, onChange }) => {
  return (
    <div className="card-footer">
      <label className="flex items-center gap-2 text-sm text-gray-600">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="connect-checkbox"
        />
        Connect
      </label>
    </div>
  );
};

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;