"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const TemplateController_1 = require("../Controllers/TemplateController");
const DownloadController_1 = require("../Controllers/DownloadController");
const auth_controller_1 = __importDefault(require("../Controllers/auth.controller"));
const auth_middleware_1 = require("../Middleware/auth.middleware");
const router = express_1.default.Router();
const templateController = new TemplateController_1.TemplateController();
const downloadController = new DownloadController_1.DownloadController();
router.get("/", (req, res) => {
    res.send("Server is up and running!");
});
router.post("/generate-pdf", auth_middleware_1.authenticateJWT, (req, res) => {
    templateController.createPdf(req, res);
});
router.get("/download-pdf", auth_middleware_1.authenticateJWT, (req, res) => {
    downloadController.downloadFile(req, res);
});
router.post("/login", auth_controller_1.default.login);
exports.default = router;
//# sourceMappingURL=routes.js.map