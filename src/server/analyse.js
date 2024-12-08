const sentimentAPI = "https://api.meaningcloud.com/sentiment-2.1";
const axios = require("axios");

const analyzeSentiment = async (articleURL, apiKey) => {
    // API request: Constructing URL with key and article URL
    try {
        const response = await axios.get(`${sentimentAPI}?key=${apiKey}&url=${articleURL}&lang=en`);
        
        const { code } = response.data.status;

        // Handle possible errors based on response code
        if (code === 100) {
            return generateErrorResponse(code, "Please provide a valid URL.");
        } else if (code === 212) {
            return generateErrorResponse(code, response.data.status.msg);
        }
        
        return generateSuccessResponse(response.data, code);

    } catch (error) {
        // Catch any other errors during the API request
        console.error("Error analyzing sentiment:", error);
        return generateErrorResponse(500, "Internal server error.");
    }
}

const generateErrorResponse = (code, message) => {
    return {
        errorCode: code,
        errorMessage: message
    };
}

const generateSuccessResponse = (data, code) => {
    const { score_tag, agreement, subjectivity, confidence, irony } = data;
    const resultData = {
        score_tag: score_tag,
        agreement: agreement,
        subjectivity: subjectivity,
        confidence: confidence,
        irony: irony
    };
    return { result: resultData, statusCode: code };
}

module.exports = {
    analyzeSentiment
};
