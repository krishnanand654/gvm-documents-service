import { Request, Response } from 'express';
import { TC_TemplateServices } from '../Services/TC_TemplateServices';



export class TemplateController {

    private pdfService: TC_TemplateServices;

    constructor() {
        this.pdfService = new TC_TemplateServices();
    }

    async createPdf(req: Request, res: Response) {
        try {
            const pdfBytes = await this.pdfService.createPdf(req.body);
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
            res.status(200).send(pdfBytes);
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Failed to generate PDF' });
        }
    }
}
