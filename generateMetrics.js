require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

// GitHub API endpoint for generating the SVG files
const apiUrl = "https://github-readme-stats.vercel.app/api";

// Function to generate the SVG file for a specific metric
async function generateSvg(metricName, queryParams) {
  const queryString = new URLSearchParams(queryParams).toString();
  const url = `${apiUrl}/${metricName}?${queryString}`;

  try {
    const response = await axios.get(url);
    const svgContent = response.data;
    const filePath = `${metricName}.svg`;

    fs.writeFileSync(filePath, svgContent);
    console.log(`Generated ${metricName}.svg`);
  } catch (error) {
    console.error(`Error generating ${metricName}.svg:`, error.message);
  }
}

// Main function to generate all the SVG files
async function generateMetrics() {
  // Specify the metrics and their respective query parameters
  const metrics = [
    { name: "acti_comm", params: { username: process.env.GITHUB_USERNAME } },
    { name: "iso_calender", params: { username: process.env.GITHUB_USERNAME } },
    {
      name: "issue_pr_lang",
      params: { username: process.env.GITHUB_USERNAME },
    },
    {
      name: "metadata",
      params: {
        username: process.env.GITHUB_USERNAME,
        email: process.env.EMAIL_ADDRESS,
        linkedin: process.env.LINKEDIN_USERNAME,
      },
    },
    { name: "repositories", params: { username: process.env.GITHUB_USERNAME } },
  ];

  // Generate SVG files for each metric
  for (const metric of metrics) {
    await generateSvg(metric.name, metric.params);
  }
}

// Call the main function to start generating the SVG files
generateMetrics();
