// middleware/authMiddleware.js

export const protect = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (token === process.env.ADMIN_TOKEN) {
      next(); // User is authorized
    } else {
      res.status(401).json({ message: 'Not authorized' });
    }
  };
  