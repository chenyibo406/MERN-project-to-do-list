import mongoose from "mongoose";
import PostTask from "../models/postMessage.js";

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
  const { id: _id } = req.param;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  const updatedPost = await postMessage.findByAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
};
