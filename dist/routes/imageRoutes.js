"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const imageController_1 = require("../controllers/imageController");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/resize", imageController_1.resizeImage);
//# sourceMappingURL=imageRoutes.js.map