import React from "react";
import Card from "./Card";

const Grid = ({ initialData, handleToggle, loadingServices }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {initialData.map((item) => {
        const key = item.name.toLowerCase();
        return (
          <Card key={key} status={item.is_connected ? "connected" : "disconnected"}>
            <Card.Header
              icon={item.icon}
              name={item.name}
              status={item.is_connected ? "connected" : "disconnected"}
            />
            <Card.Body description={item.description || "No description"} />
            <Card.Footer
              checked={item.is_connected}
              onChange={() => handleToggle(key)}
              loading={loadingServices[key]}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default Grid;