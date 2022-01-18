"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.Server = void 0;
// The components well
const Client_1 = __importDefault(require("./client/Client"));
const Server_1 = __importDefault(require("./server/Server"));
exports.Server = Server_1.default;
exports.Client = Client_1.default;
