import express from "express";
import { TemplateController } from "../Controllers/TemplateController";
import { DownloadController } from "../Controllers/DownloadController";
import AuthController from "../Controllers/auth.controller";
import { authenticateJWT } from "../Middleware/auth.middleware";

const router = express.Router();
const templateController = new TemplateController();
const downloadController = new DownloadController();

router.get("/", (req, res) => {
  res.send("Server is up and running!");
});

router.post("/generate-pdf", authenticateJWT, (req, res) => {
  templateController.createPdf(req, res);
});

router.get("/download-pdf", authenticateJWT, (req, res) => {
  downloadController.downloadFile(req, res);
});

router.post("/login", AuthController.login);

export default router;
