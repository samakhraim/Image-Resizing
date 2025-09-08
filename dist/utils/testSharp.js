"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
(async () => {
    const info = await (0, sharp_1.default)({
        create: {
            width: 50,
            height: 50,
            channels: 3,
            background: { r: 255, g: 0, b: 0 }
        }
    })
        .png()
        .toBuffer();
    console.log("✅ Sharp works, buffer length:", info.length);
})();
//# sourceMappingURL=testSharp.js.map