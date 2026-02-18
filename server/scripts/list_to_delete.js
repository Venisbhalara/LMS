const fetch = require("node-fetch");
const fs = require("fs");

async function listCourses() {
  try {
    const response = await fetch("http://localhost:5000/api/courses");
    const data = await response.json();

    let output = "";
    if (data.success) {
      const targets = [
        "Introduction to Web Development",
        "Advanced React Development",
        "Database Design with MySQL",
      ];

      data.data.forEach((course) => {
        if (targets.includes(course.title)) {
          output += `ID:${course.id}|TITLE:${course.title}\n`;
        }
      });
    } else {
      output = "Failed to fetch courses: " + data.message;
    }
    fs.writeFileSync("courses_list_output.txt", output);
    console.log("Done writing to file.");
  } catch (error) {
    console.error("Error:", error.message);
    fs.writeFileSync("courses_list_output.txt", "Error: " + error.message);
  }
}

listCourses();
