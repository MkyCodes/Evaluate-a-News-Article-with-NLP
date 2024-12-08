import axios from "axios";

// Importing the URL validation function
const { validateUrl } = require("./urlValidator");

const urlInput = document.getElementById("urlInput");

// Handle input change event
document.addEventListener('DOMContentLoaded', function () {
    urlInput.addEventListener("change", (e) => {
        e.preventDefault();
        hideError();
        toggleResults(false);
    });
});

// Handle form submission
async function submitForm(e) {
    e.preventDefault();

    const form = document.querySelector("form");

    if (!validateUrl(urlInput.value)) {
        showError();
        document.getElementById("errorMessage").innerHTML = "Please enter a valid URL.";
        urlInput.value = "";
        return;
    }
    showLoading(true);
    const { data } = await axios.post(
        'http://localhost:8000/',
        form,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    renderResults(data);
}

// Displaying results on the UI
const renderResults = (data) => {

    showLoading(false);
    if (data.msg) {
        showError();
        toggleResults(false);
        document.getElementById("errorMessage").innerHTML = `${data.msg}`;
        return;
    }
    hideError();
    toggleResults(true);

    document.getElementById("agreementStatus").innerHTML = `Agreement: ${data.sample.agreement}`;
    document.getElementById("subjectivityLevel").innerHTML = `Subjectivity: ${data.sample.subjectivity}`;
    document.getElementById("confidenceLevel").innerHTML = `Confidence: ${data.sample.confidence}`;
    document.getElementById("ironyDetected").innerHTML = `Irony: ${data.sample.irony}`;
    document.getElementById("overallScore").innerHTML = `Score Tag: ${data.sample.score_tag}`;
}

// Show or hide the loader
const showLoading = (isLoading) => {
    const loader = document.getElementById('loadingSpinner');
    if (isLoading) {
        loader.style.display = 'block';
        return;
    }
    loader.style.display = 'none';
}

// Toggle the visibility of results
const toggleResults = (isVisible) => {
    document.querySelectorAll("ul li").forEach(element => {
        element.style.display = isVisible ? "block" : "none";
    });
}

// Show error message
const showError = () => document.getElementById("errorMessage").style.display = "block";

// Hide error message
const hideError = () => document.getElementById("errorMessage").style.display = "none";

export { submitForm }
