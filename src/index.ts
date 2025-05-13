import express, { Application } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import articleRoutes from "./routes/articleRoutes";

dotenv.config();
const app: Application = express();
const PORT = process.env.PORT;

app.use(express.json());

//Routes
app.use("/auth", authRoutes);
app.use("/articles", articleRoutes);

// Default route buat ngecek apakah server berjalan
app.get("/", (req, res) => {
  res.send("API Works!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
