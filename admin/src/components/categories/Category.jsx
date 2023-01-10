import React from "react";

export const Category = ({name,count}) => {
  return (
    <div className="col-lg-6 mb-4">
      <div className="card bg-dark text-white shadow">
        <div className="card-body">{name}:  {count}</div>
      </div>
    </div>
  );
};
