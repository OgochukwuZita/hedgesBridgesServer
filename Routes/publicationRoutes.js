import express from "express";
import Publication from "../Models/Publications.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE publication (protected)
router.post("/", protect, async (req, res) => {
  const { title, intro, content, author } = req.body;

  if (!title || !intro || !content || !author) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newPublication = new Publication({ title, intro, content, author });
    await newPublication.save();
    res.status(201).json({ message: "Publication created successfully", publication: newPublication });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating publication" });
  }
});

// READ all publications
router.get("/", async (req, res) => {
  try {
    const publications = await Publication.find();
    res.status(200).json(publications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching publications" });
  }
});

// READ single publication
router.get("/:id", async (req, res) => {
  try {
    const publication = await Publication.findById(req.params.id);
    if (!publication) return res.status(404).json({ message: "Publication not found" });
    res.status(200).json(publication);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching publication" });
  }
});

// UPDATE publication (protected)
router.put("/:id", protect, async (req, res) => {
  const { title, intro, content, author } = req.body;
  try {
    const updatedPublication = await Publication.findByIdAndUpdate(
      req.params.id,
      { title, intro, content, author },
      { new: true, runValidators: true }
    );
    if (!updatedPublication) return res.status(404).send({ message: "Publication not found" });
    res.status(200).send({ message: "Publication updated successfully", publication: updatedPublication });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating publication" });
  }
});

// DELETE publication (protected)
router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedPublication = await Publication.findByIdAndDelete(req.params.id);
    if (!deletedPublication) return res.status(404).json({ message: "Publication not found" });
    res.status(200).json({ message: "Publication deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting publication" });
  }
});

export default router;
