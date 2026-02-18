const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

async function testUpload() {
  try {
    // create a dummy file
    const dummyPath = path.join(__dirname, "test_resume.pdf");
    fs.writeFileSync(
      dummyPath,
      "This is a test resume content masquerading as PDF.",
    );

    const form = new FormData();
    form.append("name", "Verification User");
    form.append("email", "verify@example.com");
    form.append("role", "Frontend Developer");
    form.append("resume", fs.createReadStream(dummyPath));

    console.log(
      "Sending request to http://localhost:5000/api/careers/apply...",
    );

    const response = await axios.post(
      "http://localhost:5000/api/careers/apply",
      form,
      {
        headers: {
          ...form.getHeaders(),
        },
      },
    );

    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);

    // clean up
    fs.unlinkSync(dummyPath);
    console.log("Test Passed!");
  } catch (error) {
    if (error.response) {
      console.error(
        "Error Response:",
        error.response.status,
        error.response.data,
      );
    } else {
      console.error("Error:", error.message);
    }
  }
}

testUpload();
