import { Request, Response } from "express";
import prisma from "../services/prisma";
import { AuthRequest } from "../middlewares/authMidleware";

//Get semua artikel
const getAllArticles = async (req: Request, res: Response) => {
  try {
    const article = await prisma.article.findMany();
    res.status(200).json({
      message: "Posts retrieved successfully",
      data: article,
    });
  } catch (error) {
    console.error("Error getting all article:", error);
    res.status(500).json({ message: "Failed to retrieve article" });
  }
};

//Get artikel detail berdasarkan id
const getArticleById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const articleId = parseInt(id);

    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });

    res.status(200).json({
      message: "Post retrieved successfully",
      data: article,
    });
  } catch (error) {
    console.error("Error getting article by ID:", error);
    res.status(500).json({ message: "Failed to retrieve article" });
  }
};

//Create artikel
const createArticle = async (req: AuthRequest, res: Response) => {
  try {
    const { title, content } = req.body;
    const authorId = req.author?.id;

    if (!authorId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required" });
      return;
    }

    const newArticle = await prisma.article.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    res.status(201).json({
      message: "Article created successfully",
      data: newArticle,
    });
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Failed to create article" });
  }
};

//Update artikel
const updateArticle = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const articleId = parseInt(id);
    const { title, content } = req.body;
    const authorId = req.author?.id;

    if (!authorId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    if (article.authorId !== authorId) {
      res
        .status(403)
        .json({ message: "You can only update your own arctiles" });
      return;
    }

    const updateArticle = await prisma.article.update({
      where: {
        id: articleId,
      },
      data: {
        title,
        content,
      },
    });

    res.status(200).json({
      message: "Article updated successfully",
      data: updateArticle,
    });
  } catch (error) {
    console.error("Error updating article:", error);
    res.status(500).json({ message: "Failed to update article" });
  }
};

//Detele artikel
const deleteArticle = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const articleId = parseInt(id);
    const authorId = req.author?.id;

    if (!authorId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const article = await prisma.article.findUnique({
      where: {
        id: articleId,
      },
    });

    if (!article) {
      res.status(404).json({ message: "Article not found" });
      return;
    }

    if (article.authorId !== authorId) {
      res
        .status(403)
        .json({ message: "You can only delete your own arctiles" });
      return;
    }

    await prisma.article.delete({
      where: {
        id: articleId,
      },
    });

    res.status(200).json({
      message: "Article deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting article:", error);
    res.status(500).json({ message: "Failed to delete article" });
  }
};

export {
  getAllArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
};
