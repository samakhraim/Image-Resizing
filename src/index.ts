import express from "express";
import { router as imageRoutes } from "./routes/imageRoutes";

const app = express();

// Routes
app.use("/api/images", imageRoutes);

// Default root route
app.get("/", (req, res) => {
  res.send("Image Resizer API is running! Use /api/images/resize");
});

// Only start the server if not in test mode
if (process.env.NODE_ENV !== "test") {
  app.listen(5000, () => {
    console.log(" Server running on http://localhost:5000");
    console.log(
      " Try this in your browser: http://localhost:5000/api/images/resize?width=200&height=200&filename=test.jpg"
    );
  });
}


export default app;
