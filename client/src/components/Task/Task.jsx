import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch } from "react-redux";
import { deletePost, completePost } from "../../actions/posts";

const Task = ({
  title,
  setTitle,
  taskContent,
  setTaskContent,
  setCurrentId,
  contentId,
  setUniTaskComplete,
  // setEditTitleOn,
  setShowTitle,
  setInput,
}) => {
  // TODO: Make the alert warning  replace the info icon also with alarm color as the duedate
  //  Hint: <i class="bi bi-hourglass-split"></i>
  // TODO: fix bug
  const dispatch = useDispatch();

  const [unieditMode, setUniEditMode] = useState(false);

  const titleChangeHandler = (e) => {
    e.preventDefault();
    setTitle(e.currentTarget.textContent);
    setUniEditMode(true);
  };

  const taskChangeHandler = (e) => {
    e.preventDefault();
    setTaskContent(e.currentTarget.textContent);
    setUniEditMode(true);
  };

  const handleUniEditTask = () => {
    setUniTaskComplete(true);
    setUniEditMode(false);
    setCurrentId(contentId);
  };

  const handleEditTask = () => {
    setInput(taskContent);
    setShowTitle(title);
    setCurrentId(contentId);
  };

  return (
    <div>
      <ul className="list-group list-group-horizontal rounded-0 bg-transparent">
        {/* Checked✔  icon */}
        <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
          <div className="form-check">
            <input
              className="btn"
              style={{ fontSize: "1.5rem" }}
              type="checkbox"
              value=""
              onClick={() => dispatch(completePost(contentId))}
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
            onInput={titleChangeHandler}
            style={{ display: "inline-block", minWidth: "20px" }}
          >
            {title}
          </span>
          &nbsp;-&nbsp;
          <span
            className="input"
            role="textbox"
            contentEditable
            suppressContentEditableWarning={true}
            onInput={taskChangeHandler}
            style={{ display: "inline-block", minWidth: "20px" }}
          >
            {taskContent}
          </span>
          {unieditMode && (
            <button
              className="btn"
              style={{ color: "blue" }}
              onClick={handleUniEditTask}
            >
              Add <i className="bi bi-plus-circle-fill"></i>
            </button>
          )}
        </div>

        {/* Editing 📝 Task */}
        <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
          <div className="d-flex flex-row justify-content-end mb-1">
            <i
              className="bi bi-pencil-fill text-info btn"
              style={{ fontSize: "1rem" }}
              onClick={handleEditTask}
            ></i>

            {/* Delete Task  */}
            <i
              className="bi bi-trash-fill text-danger btn"
              style={{ fontSize: "1rem" }}
              onClick={() => dispatch(deletePost(contentId))}
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
