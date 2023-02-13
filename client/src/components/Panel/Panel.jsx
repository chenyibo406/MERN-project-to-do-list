import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Panel = () => {
  // TODO: LET the filter function work
  // TODO: LET the sorter function work
  return (
    <div>
      <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
        <p className=" mb-0 me-2 text-muted">Filter</p>
        <select className="select">
          <option value="1">All</option>
          <option value="2">Completed</option>
          <option value="3">Active</option>
          {/* <option value="4">Has due date</option> */}
        </select>
        {/* <p className=" mb-0 ms-4 me-2 text-muted">Sort</p>
        <select className="select">
          <option value="1">Added date</option>
          <option value="2">Due date</option>
        </select> */}

        <i
          className="bi bi-sort-down-alt ms-2"
          style={{ fontSize: "1.5rem" }}
        ></i>
      </div>
    </div>
  );
};

export default Panel;
