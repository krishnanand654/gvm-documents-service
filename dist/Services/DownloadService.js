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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class DownloadService {
    downloadFile(fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!fileName) {
                throw new Error('File name is required');
            }
            // const filePath = path.join(__dirname, '../../', 'Files', fileName);
            const filePath = path_1.default.join(process.cwd(), process.env.FILE_PATH, fileName);
            if (!fs_1.default.existsSync(filePath)) {
                throw new Error('File not found');
            }
            return filePath;
        });
    }
}
exports.DownloadService = DownloadService;
//# sourceMappingURL=DownloadService.js.map