const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { analyzeSentiment } = require("./analyse");

const app = express();
const port = 8000;

// Middleware setup
app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

// Load environment variables
dotenv.config();

// Fetch the API key from environment variables
const sentimentAPIKey = process.env.API_KEY;

// Serve the main page on a GET request to the root
app.get('/', (req, res) => {
    res.sendFile("index.html", { root: __dirname });
});

// Handle POST requests to analyze sentiment of the provided URL
app.post("/", async (req, res) => {
    try {
        // 1. Extract URL from request body
        const articleURL = req.body.URI;

        // 2. Analyze sentiment by calling the analyzeSentiment function with the URL and API key
        const analysisResult = await analyzeSentiment(articleURL, sentimentAPIKey);

        const { errorCode, errorMessage, resultData } = analysisResult;

        // 3. Send an error response if the analysis returned an error code
        if (errorCode === 212 || errorCode === 100) {
            return res.status(400).send({ error: errorMessage, code: errorCode });
        }

        // 4. Send the successful result response
        return res.status(200).send({ data: resultData, code: errorCode });

    } catch (error) {
        // Handle server errors
        console.error("Error processing request:", error);
        return res.status(500).send({ error: "Internal server error" });
    }
});

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
