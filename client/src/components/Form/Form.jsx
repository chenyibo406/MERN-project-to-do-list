import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Form.styles.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Task from "../Task/Task";
import Panel from "../Panel/Panel";
import { useSelector, useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";

// TODO: GET THE CURRENT ID and Update the title awa taskcontent, date, delete in Task component

const Form = ({ currentId, setCurrentId }) => {
  // TODO: Make the add task work! ✔
  // TODO: Make the calendar work!

  const [todoList, setTodoList] = useState({
    title: "To do list",
    task: "",
    complete: false,
    user: "",
  });

  const [input, setInput] = useState("");
  const [title, setTitle] = useState("To do list");
  const [taskContent, setTaskContent] = useState([]);
  const [editTask, setEditTask] = useState(false);

  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);

  const taskHandleChange = (e) => {
    setInput(e.target.value);
    setTodoList({ ...todoList, task: e.target.value });
  };

  const handleSubmit = (e) => {
    setTaskContent((prev) => [...prev, { task: input }]);

    // setTodoList({ title: title, task: input, complete: false });

    dispatch(createPost(todoList));

    setInput("");
  };

  const handleDelete = (index) => {
    var newList = todoList;
    newList.splice(index, 1);
    setTodoList([...newList]);
  };

  const handleEdit = (index) => {
    setEditTask(true);
  };

  const titleChangeHandler = (e) => {
    e.preventDefault();
    setTitle(e.currentTarget.textContent);
    setTodoList({ ...todoList, title: e.currentTarget.textContent });
  };

  // console.log(title);
  // console.log(input);
  console.log(todoList);

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div
              className="card"
              id="list1"
              style={{ borderRadius: ".75rem", backgroundColor: " #eff1f2" }}
            >
              <div className="card-body py-4 px-4 px-md-5">
                <p className="h1 text-center mt-3 mb-4 pb-3 text-primary d-flex justify-content-center">
                  <i className=" bi bi-check"></i>

                  <span
                    className="input"
                    role="textbox"
                    contentEditable
                    suppressContentEditableWarning={true}
                    onInput={titleChangeHandler}
                  >
                    To Do list
                  </span>
                </p>

                <div className="pb-2">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex flex-row align-items-center">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          placeholder="Add new tasks..."
                          onChange={taskHandleChange}
                          name="task"
                          // value={inputValue}

                          value={input}
                        />
                        <a
                          href="#!"
                          data-mdb-toggle="tooltip"
                          title="Set due date"
                        >
                          <i
                            className="bi bi-calendar-day ms-3 me-3 "
                            style={{ fontSize: "2rem" }}
                          ></i>
                        </a>
                        <div>
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handleSubmit}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />
                <Panel />
                {taskContent.map((content, index) => {
                  // console.log(content);
                  return (
                    <Task
                      key={index}
                      title={title}
                      taskContent={content["task"]}
                      deleteTask={handleDelete}
                      editTask={handleEdit}
                      setCurrentId={setCurrentId}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;

// TODO1: Make the editable element.
// TODO2: Make the outline of input area disapear when edit the content.
