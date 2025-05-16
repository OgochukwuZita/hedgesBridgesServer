// routes/auth.js
import express from "express";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "password") {
    const token = jwt.sign({ id: "adminId", username }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "Lax", 
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Check if user is still logged in
router.get("/check-auth", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ loggedIn: false });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ loggedIn: true, user: verified });
  } catch (err) {
    res.status(401).json({ loggedIn: false });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: false
  });
  res.status(200).json({ message: "Logged out" });
});

export default router;
