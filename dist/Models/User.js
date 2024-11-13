"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.users = [
    {
        id: "1",
        username: process.env.TEST_USERNAME,
        password: process.env.PASSWORD,
    }
];
//# sourceMappingURL=User.js.map