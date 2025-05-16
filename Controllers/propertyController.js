import Property from "../Models/Properties.js";

// Create a property
export const createProperty = async (req, res) => {
  const { description, price, location, images } = req.body;

  if (!description || !price || !location || !images) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newProperty = new Property({
      description,
      price,
      location,
      images,
    });

    await newProperty.save();
    res.status(201).json({ message: "Property added successfully", property: newProperty });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error adding property" });
  }
};

// Get all properties
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching properties" });
  }
};

// Get a single property by ID
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(property);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching property" });
  }
};

// Update property details
export const updateProperty = async (req, res) => {
  const { description, location, price, images } = req.body;
  const { id } = req.params;

  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      id,
      { description, location, price, images },
      { new: true, runValidators: true }
    );

    if (!updatedProperty) {
      return res.status(404).send({ message: "Property not found" });
    }

    res.status(200).send({ message: "Property updated successfully", property: updatedProperty });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error updating property" });
  }
};

// Delete a property by ID
export const deleteProperty = async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);

    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting property" });
  }
};
