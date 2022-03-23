import React from "react";

function Stat({ icon, label, value }) {
  return (
    <div className="fragment__stat">
      {icon}
      <div className="fragment__stat__details">
        <span className="fragment__stat__label">{label}</span>
        <span className="fragment__stat__value">{value}</span>
      </div>
    </div>
  );
}

export default Stat;
