import express from "express";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

//middleware
app.use(express.json()); //This middleware will parse JSON bddies: allow access to req.body
app.use(rateLimiter);
app.use(cors({ origin: "http://localhost:5173" }));
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

//Connect the database then listen to the port
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Listening to port: ", PORT);
  });
});
