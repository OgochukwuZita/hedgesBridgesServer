import mongoose from "mongoose";

// Publication Schema
const publicationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  intro: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Publication = mongoose.model("Publication", publicationSchema);

export default Publication;
