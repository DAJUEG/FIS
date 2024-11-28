const fs = require("fs"); // File system utility
const axios = require("axios"); // HTTP client for making API requests
const FormData = require("form-data"); // To handle multipart/form-data streams

// API configuration
const PROJECT = "all";
const API_URL = `https://my-api.plantnet.org/v2/identify/${PROJECT}?api-key=`;
const API_PRIVATE_KEY = "2b105CNFzkqUGenb8CPhOs4YVO";

/**
 * Sends a plant identification request to the PlantNet API.
 *
 * @param {string} imagePath - Path to the uploaded image file.
 * @param {string} organs - Organ type associated with the image (e.g., "leaf", "flower").
 * @returns {Promise<Object>} - The response data from the PlantNet API.
 */
const getName = async (imagePath, organs) => {
  // Create a new form-data object
  let form = new FormData();
  form.append("organs", organs); // Add organ type
  form.append("images", fs.createReadStream(imagePath)); // Add image file as a stream

  try {
    // Send a POST request to the PlantNet API
    const { status, data } = await axios.post(
      `${API_URL}${API_PRIVATE_KEY}`,
      form,
      {
        headers: form.getHeaders(), // Include form-data headers
      }
    );
    return { status, data };
  } catch (error) {
    // Handle errors and rethrow with an informative message
    throw new Error(error.message);
  }
};

module.exports = getName;
