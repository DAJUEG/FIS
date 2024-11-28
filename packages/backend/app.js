import express from "express";
import multer from "multer";
import { getName } from "./get-name";

const app = express();
const port = 3000;

configureMulter();

setupRoutes();

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

function setupRoutes() {
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.post("/get-name", upload.array("image", 1), async (req, res) => {
        const { files, body } = req;

        if (files?.length !== 1 || !body.organs) {
            throw new Error("please upload EXACTLY one image or organ type.");
        }

        const imagePath = files[0].path;
        const organs = body.organs;

        await getName(imagePath, organs).then((result) => {
            res.status(200).json(result);
        }).catch((e) => {
            res.status(400).json({ error: error.message });
        });
    });
}

function configureMulter() {
    const storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "uploads");
        },
        filename: (req, file, callback) => {
            callback(null, file.originalname);
        },
    });

    const upload = multer({ storage });
}
