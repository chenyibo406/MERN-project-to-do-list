import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Task from "../../components/Task/Task";
import Panel from "../Panel/Panel";

import { useSelector, useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

const Form = ({ currentId, setCurrentId }) => {
  const [todoList, setTodoList] = useState({
    title: "To do list",
    task: "",
    complete: false,
    user: "",
  });
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("To do list");
  const [taskContent, setTaskContent] = useState("");
  const [uniTaskComplete, setUniTaskComplete] = useState(false);

  const [showTitle, setShowTitle] = useState("To do list");

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const postUpdate = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (postUpdate) {
      setInput(postUpdate["task"]);
    }
  }, [postUpdate]);

  useEffect(() => {
    if (uniTaskComplete) {
      dispatch(
        updatePost(currentId, {
          title: title,
          task: taskContent,
          complete: false,
          user: "",
        })
      );
      setInput("");
    }
  }, [uniTaskComplete]);

  const clear = () => {
    setCurrentId(null);
    setTitle("To Do List");
    setShowTitle("To Do List");
    setTodoList({ title: "To Do List", task: "", complete: false, user: "" });
  };

  const taskHandleChange = (e) => {
    setInput(e.target.value);
    setTodoList({ ...todoList, task: e.target.value });
  };

  const titleChangeHandler = (e) => {
    setTitle(e.target.textContent);
    setTodoList({ ...todoList, title: title, task: input });
  };

  const handleSubmit = (e) => {
    if (input.length === 0 || title.length === 0) {
      console.log("please input task");
    } else if (currentId) {
      dispatch(updatePost(currentId, todoList));

      clear();
    } else {
      console.log(todoList);
      dispatch(createPost(todoList));
      clear();
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col">
            <div
              className="card"
              style={{ borderRadius: ".75rem", backgroundColor: " #eff1f2" }}
            >
              <div className="card-body py-4 px-4 px-md-5">
                <p className="h1 text-center mt-3 mb-4 pb-3 text-primary d-flex justify-content-center">
                  <i className="bi bi-check2-all">
                    <span
                      role="textbox"
                      contentEditable
                      suppressContentEditableWarning={true}
                      onInput={titleChangeHandler}
                      value="To do list"
                      style={{
                        display: "inline-block",
                        outline: "0px solid transparent",
                      }}
                    >
                      {showTitle}
                    </span>
                  </i>
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
                          value={input}
                        />

                        <div>
                          <button
                            className="btn btn-primary ms-3 me-3"
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
                {posts.map((content) => {
                  return (
                    <Task
                      key={content["_id"]}
                      title={content["title"]}
                      taskContent={content["task"]}
                      setCurrentId={setCurrentId}
                      contentId={content._id}
                      setTitle={setTitle}
                      setTaskContent={setTaskContent}
                      setUniTaskComplete={setUniTaskComplete}
                      setInput={setInput}
                      setShowTitle={setShowTitle}
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
