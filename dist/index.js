"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imageRoutes_1 = require("./routes/imageRoutes");
const app = (0, express_1.default)();
// Routes
app.use("/api/images", imageRoutes_1.router);
// Default root route
app.get("/", (req, res) => {
    res.send("Image Resizer API is running! Use /api/images/resize");
});
// Only start the server if not in test mode
if (process.env.NODE_ENV !== "test") {
    app.listen(5000, () => {
        console.log("🚀 Server running on http://localhost:5000");
        console.log("➡️ Try this in your browser: http://localhost:5000/api/images/resize?width=200&height=200&filename=test.jpg");
    });
}
exports.default = app;
//# sourceMappingURL=index.js.map