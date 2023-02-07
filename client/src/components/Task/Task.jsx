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
  setEditTitleOn,
  setInput,
}) => {
  // TODO: As the user check the task finished。
  // TODO: Make the edit icon work.
  // TODO: Make the delete icon work. ✔
  // TODO: Make the alert warning icon replace the info icon also with alarm color as the deadline hit
  //  Hint: <i class="bi bi-hourglass-split"></i> for house glass
  // TODO: Double click the task and change the content.
  const dispatch = useDispatch();

  const [unieditMode, setUniEditMode] = useState(false);

  const handleEditTask = () => {
    setEditTitleOn(true);
    setTitle(title);
    setInput(taskContent);
    setCurrentId(contentId);
  };

  const handleUniEditTask = () => {
    setUniTaskComplete(true);
    setUniEditMode(false);
    setCurrentId(contentId);
  };

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
  console.log(contentId);

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
              id="flexCheckChecked1"
              aria-label="..."
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
            // onClick={handleEditTask}
          >
            {title}
          </span>
          -
          <span
            className="input"
            role="textbox"
            contentEditable
            suppressContentEditableWarning={true}
            onInput={taskChangeHandler}
            style={{ display: "inline-block", minWidth: "20px" }}
            // onClick={handleEditTask}
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
