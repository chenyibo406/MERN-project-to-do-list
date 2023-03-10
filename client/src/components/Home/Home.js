import React, { useState, useEffect } from "react";
import Form from "../Form/Form";
// import Form from "./components/Form/Form";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
// import { getPosts } from "./actions/posts";
// import Navbar from "./components/Navbar/Navbar";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div>
      <Form currentId={currentId} setCurrentId={setCurrentId} />
    </div>
  );
};

export default Home;
