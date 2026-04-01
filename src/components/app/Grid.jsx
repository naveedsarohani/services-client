import React from "react";
import Card from "./Card";

const Grid = ({ data, handleToggle, loadingServices }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((item) => (
        <Card
          key={item.name}
          status={item.is_connected ? "connected" : "disconnected"}
        >
          <Card.Header
            id={item.id}
            icon={item.icon}
            name={item.name}
            status={item.is_connected ? "connected" : "disconnected"}
          />
          <Card.Body description={item.description || "No description"} />
          <Card.Footer
            checked={item.is_connected}
            onChange={() => handleToggle(item.name)}
            loading={loadingServices[item.name]}
          />
        </Card>
      ))}
    </div>
  );
};

export default Grid;