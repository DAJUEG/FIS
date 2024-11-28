const express = require("express");
const multer = require("multer");
const getName = require("./getName");
const fs = require("fs"); // File system utility

const app = express();
const port = 3000;

// Configure Multer to retain original file name and extension
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set upload directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Retain original file name
  },
});

// Initialize Multer
const upload = multer({ storage });

/**
 * POST /getName
 * Handles file uploads and processes organ type for plant identification.
 */
app.post("/getName", upload.array("images", 1), async (req, res) => {
  try {
    const { files, body } = req;

    // Validate the uploaded data
    if (!files || files.length !== 1 || !body.organs) {
      throw new Error("Please upload one image and provide an organ type.");
    }

    // Extract file path and organ type
    const imagePath = files[0].path; // Path of the uploaded file
    const organs = body.organs; // Organ type from the request body

    // Process the data using getName function
    const result = await getName(imagePath, organs);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * GET /
 * Basic route to confirm server is running.
 */
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
