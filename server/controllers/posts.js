import mongoose from "mongoose";
import PostTask from "../models/postMessage.js";
import express from "express";

export const getPosts = async (req, res) => {
  try {
    const postTasks = await PostTask.find();
    res.status(200).json(postTasks);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostTask(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;
  // console.log(req);
  // console.log(req.params);
  // console.log(id);
  // console.log(post);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const updatedPost = await PostTask.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  await PostTask.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};

export const completedPost = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  const post = await PostTask.findById(id);
  const updatedPost = await PostTask.findByIdAndUpdate(
    id,
    {
      complete: !post.complete,
    },
    { new: true }
  );
  res.json(updatedPost);
};
