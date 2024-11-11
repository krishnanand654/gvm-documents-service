import express from 'express';
import { TemplateController } from '../Controllers/TemplateController';
import { DownloadController } from '../Controllers/DownloadController';


const router = express.Router();
const templateController = new TemplateController();
const downloadController = new DownloadController();

router.post('/generate-pdf', (req,res) => {templateController.createPdf(req, res)});
router.post('/download-pdf', (req,res)=>{downloadController.downloadFile(req, res)});

export default router;
