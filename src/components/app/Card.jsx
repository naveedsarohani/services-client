import React from "react";

const Card = ({ icon, name, status, description, checked, onChange, isLoading }) => {
  return (
    <div
      className={`card p-4 border rounded shadow-sm relative transition ${isLoading ? "opacity-50 pointer-events-none" : ""
        }`}
    >

      {/* Loader Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded">
          <span className="text-sm font-medium">Processing...</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <img src={icon} alt={name} className="w-8 h-8" />
          <h3 className="font-medium capitalize">{name}</h3>
        </div>

        <span className={`${status === "connected" ? "text-green-600" : "text-red-600"} -mt-7 text-xs`}>
          ● {status === "connected" ? "Connected" : "Disconnected"}
        </span>
      </div>

      {/* Body */}
      <p className="text-gray-600 text-xs">{description}</p>

      {/* Footer */}
      <div className="mt-2 text-xs">
        <label className="flex items-center gap-2 text-sm text-gray-600 text-xs">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={isLoading}
            className="connect-checkbox"
          />
          {isLoading ? "Processing..." : "Connect"}
        </label>
      </div>
    </div>
  );
};

export default Card;