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
exports.DownloadController = void 0;
const DownloadService_1 = require("../Services/DownloadService");
class DownloadController {
    constructor() {
        this.downloadService = new DownloadService_1.DownloadService();
    }
    downloadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileName = req.query.fileName;
            try {
                const filePath = yield this.downloadService.downloadFile(fileName);
                res.download(filePath, fileName, (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send({ message: 'Error downloading the file' });
                    }
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message === 'File name is required') {
                        return res.status(400).send({ message: error.message });
                    }
                    else if (error.message === 'File not found') {
                        return res.status(404).send({ message: error.message });
                    }
                    else {
                        console.error(error);
                        return res.status(500).send({ message: 'Internal Server Error' });
                    }
                }
                else {
                    console.error(error);
                    return res.status(500).send({ message: 'Unknown error occurred' });
                }
            }
        });
    }
}
exports.DownloadController = DownloadController;
//# sourceMappingURL=DownloadController.js.map