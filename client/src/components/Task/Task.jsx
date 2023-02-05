import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Task = ({ title, taskContent, deleteTask, editTask }) => {
  // TODO: As the user check the task finished。
  // TODO: Make the edit icon work.
  // TODO: Make the delete icon work. ✔
  // TODO: Make the alert warning icon replace the info icon also with alarm color as the deadline hit
  //  Hint: <i class="bi bi-hourglass-split"></i> for house glass
  // TODO: Double click the task and change the content.

  // const [editTaskOn, seteditTaskOn] = useState(false);

  const handleEditTask = () => {
    console.log("Hello");
  };

  return (
    <div>
      <ul className="list-group list-group-horizontal rounded-0 bg-transparent">
        {/* Checked icon */}
        <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
          <div className="form-check">
            <input
              className="btn"
              style={{ fontSize: "1.5rem" }}
              type="checkbox"
              value=""
              id="flexCheckChecked1"
              aria-label="..."
              // width="10px"
              // checked
            />
          </div>
        </li>
        {/* Task content */}

        <div className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
          <span
            className="input"
            role="textbox"
            contentEditable
            suppressContentEditableWarning={true}
            onClick={handleEditTask}
          >
            {title} - {taskContent}
          </span>
        </div>

        {/* editing icon */}
        <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
          <div className="d-flex flex-row justify-content-end mb-1">
            <i
              className="bi bi-pencil-fill text-info btn"
              style={{ fontSize: "1rem" }}
              onClick={editTask}
            ></i>

            {/* Delete icon ✔ */}

            <i
              className="bi bi-trash-fill text-danger btn"
              style={{ fontSize: "1rem" }}
              onClick={deleteTask}
            ></i>
          </div>

          {/* Task date edit */}
          <div className="text-end text-muted">
            <p className="small mb-0 btn">
              <i className="bi bi-info-circle-fill me-2 text-muted"></i>28th Jun
              2020
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Task;
