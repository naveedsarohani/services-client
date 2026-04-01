import React from "react";

const Card = ({ children }) => {
  return <div className="card p-4 border rounded shadow-sm">{children}</div>;
};

const Header = ({ icon, name, status }) => {
  return (
    <div className="card-header flex items-center justify-between mb-2">
      <div className="card-title flex items-center gap-2">
        <img src={icon} alt={name} className="w-8 h-8" />
        <h3 className="font-medium">{name}</h3>
      </div>

      <span
        className={`${
          status === "connected" ? "text-green-600" : "text-red-600"
        } font-semibold`}
      >
        ● {status === "connected" ? "Connected" : "Disconnected"}
      </span>
    </div>
  );
};

const Body = ({ description }) => {
  return <p className="text-gray-600 text-sm">{description}</p>;
};

const Footer = ({ checked, onChange }) => {
  return (
    <div className="card-footer mt-2">
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