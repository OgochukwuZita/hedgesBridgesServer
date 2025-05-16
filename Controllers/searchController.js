import Publication from "../Models/Publications.js";
import Property from "../Models/Properties.js";
import Review from "../Models/Reviews.js";

// Search for publications, properties, and reviews
export const searchContent = async (req, res) => {
  const { query } = req.query; // The search query

  if (!query) {
    return res.status(400).json({ message: "No search query provided" });
  }

  try {
    // Search in publications 
    const publications = await Publication.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { intro: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } }
      ]
    });

    // Search in properties 
    const properties = await Property.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } }
      ]
    });

    // Search in reviews 
    const reviews = await Review.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { message: { $regex: query, $options: "i" } }
      ]
    });

    // Combine all results
    const results = {
      publications,
      properties,
      reviews
    };

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error searching content" });
  }
};
