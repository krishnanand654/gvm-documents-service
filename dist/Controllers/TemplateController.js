"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateController = void 0;
const TC_TemplateServices_1 = require("../Services/TC_TemplateServices");
class TemplateController {
    constructor() {
        this.pdfService = new TC_TemplateServices_1.TC_TemplateServices();
    }
    createPdf(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pdfBytes = yield this.pdfService.createPdf(req.body);
                res.setHeader('Content-Type', 'application/pdf');
                res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');
                res.status(200).send(pdfBytes);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Failed to generate PDF' });
            }
        });
    }
}
exports.TemplateController = TemplateController;
//# sourceMappingURL=TemplateController.js.map