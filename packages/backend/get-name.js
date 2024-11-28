import * as fs from "node:fs";

//#region Constants
const PROJECT = "all";
const API_URL = `https://my-api.plantnet.org/v2/identify/${PROJECT}?api-key=`;
const API_PRIVATE_KEY = "2b105CNFzkqUGenb8CPhOs4YVO";
//#endregion

/**
 * Sends a plant identification request to the PlantNet API.
 *
 * @param {string} imagePath - Path to the uploaded image file.
 * @param {string} organs - Organ type associated with the image (e.g., "leaf", "flower").
 * @returns {Promise<Object>} - The response data from the PlantNet API.
 */
export const getName = async (imagePath, organs) => {
    createFormDataObject(organs, imagePath);
    return await fetchPlantNetAPI();
};

async function fetchPlantNetAPI() {
    return await fetch(`${API_URL}${API_PRIVATE_KEY}`, {
        method: "POST",
        body: form,
    }).then((res) => res.json())
        .catch((error) => {
            throw new Error(error.message);
        });
}

function createFormDataObject(organs, imagePath) {
    let form = new FormData();
    form.append("organs", organs);
    form.append("images", fs.createReadStream(imagePath));
}
