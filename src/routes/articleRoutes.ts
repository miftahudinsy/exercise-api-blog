import { Router } from "express";
import {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController";
import { authMiddleware } from "../middlewares/authMidleware";

const router = Router();

router.get("/", getAllArticles);
router.get("/:id", getArticleById);
router.post("/", authMiddleware, createArticle);
router.put("/:id", authMiddleware, updateArticle);
router.delete("/:id", authMiddleware, deleteArticle);

export default router;
