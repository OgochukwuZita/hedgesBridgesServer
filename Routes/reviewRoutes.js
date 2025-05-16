import express from "express";
import Review from "../Models/Reviews.js";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, rating, message } = req.body;

  try {
    const newReview = new Review({ name, rating, message });

    if (rating < 4) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: "Low Star Review Received",
        text: `Name: ${name}\nRating: ${rating}\nMessage: ${message}`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Email sending failed:", err);
        } else {
          console.log("Email sent:", info.response);
        }
      });

      return res.status(201).send({ message: "Thank you. Your review has been submitted and will be reviewed by our team." });
    }

    await newReview.save();
    res.status(201).send({ message: "Review added successfully", review: newReview });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error submitting review" });
  }
});

router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find({ rating: { $gte: 4 } });
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error fetching reviews" });
  }
});

export default router;
