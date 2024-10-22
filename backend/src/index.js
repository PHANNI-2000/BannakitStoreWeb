import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import managementRoutes from "./routes/managementRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import sessionConfig from "./config/sessionConfig.js";

const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://localhost:5173", // อนุญาตการเข้าถึงจาก frontend ที่นี่
    credentials: true,
  })
);

// Set session middleware
app.use(session(sessionConfig));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", managementRoutes, categoryRoutes, productRoutes);

function checkSession(req, res, next) {
  if (req.session.userId) {
    return next();
  }

  return res.status(401).json({ message: "Unauthorized" });
}

app.get("/", checkSession, (req, res) => {
  if (req.session.userId) {
    return res.status(200).json({ loggedIn: true });
  }
  return res.status(401).json({ loggedIn: false });
  // try {
  //   console.log(req.session);

  //   if (!req.session.user) {
  //     return res.status(401).json({ message: "Unauthorized" });
  //   }
  //   return res.status(200).json({ message: "Welcome to Home page" });
  // } catch (err) {
  //   return res.status(401).json({ message: "Unauthorized", errors: err });
  // }
});

// app.get("/",checkSession, (req, res) => {
//   res.status(200).json({ message: 'Session is valid', userId: req.session.userId });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
