import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Form.styles.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Task from "../Task/Task";
import Panel from "../Panel/Panel";
import { useSelector, useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";

// TODO: GET THE CURRENT ID and Update the title, "taskcontent", "date", "delete" in Task component

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
  const [taskContent, setTaskContent] = useState("");
  const [uniTaskComplete, setUniTaskComplete] = useState(false);
  const [editTitleOn, setEditTitleOn] = useState(false);
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
      // console.log("Hello");
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

  // TODO: bug, if first input title and it would cause fault
  useEffect(() => {
    if (editTitleOn) {
      setShowTitle(postUpdate["title"]);
    }
  }, [editTitleOn]);

  const taskHandleChange = (e) => {
    setInput(e.target.value);
    setTodoList({ ...todoList, task: e.target.value });
  };

  const clear = () => {
    setCurrentId(null);
    setTodoList({ title: "To do list", task: "", complete: false, user: "" });
  };

  const handleSubmit = (e) => {
    if (input.length === 0 || title.length === 0) {
      console.log("please input task");
    } else if (currentId) {
      // TODO ✔: update the content as the input content show in the element

      dispatch(updatePost(currentId, todoList));
      setEditTitleOn(false);
      setInput("");
      clear();
    } else {
      // TODO: that would set a conflict if the updatePost function fail.
      dispatch(createPost(todoList));
      clear();
    }
  };

  // const handleDelete = (index) => {
  //   var newList = todoList;
  //   newList.splice(index, 1);
  //   setTodoList([...newList]);
  // };

  const titleChangeHandler = (e) => {
    // TODO: Bug
    // e.preventDefault();
    setTitle(e.currentTarget.textContent);
    setTodoList({ ...todoList, title: title, task: input });
  };

  // console.log(`title: ${title}`);
  // console.log(`taskontent: ${taskContent}`);
  // console.log(`title: ${title}`);
  // console.log(`input: ${input}`);
  // console.log(`currentId: ${currentId}`);
  // console.log(todoList);

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
                  <i>
                    {/* Could I just don't use editTitleOn? */}
                    {editTitleOn ? (
                      // TODO: Bug
                      <span
                        className="input"
                        role="textbox"
                        contentEditable
                        suppressContentEditableWarning={true}
                        onInput={titleChangeHandler}
                        value="To do list"
                        style={{ display: "inline-block", minWidth: "20px" }}
                      >
                        {showTitle}
                      </span>
                    ) : (
                      <i className=" bi bi-check">To Do List</i>
                    )}
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
                      setEditTitleOn={setEditTitleOn}
                      setInput={setInput}
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
