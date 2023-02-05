import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: String,
  task: String,
  complete: Boolean,
  user: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const PostTask = mongoose.model("PostTask", postSchema);

export default PostTask;
