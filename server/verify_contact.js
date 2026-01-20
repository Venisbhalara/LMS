const http = require("http");

console.log("Starting verification script...");

try {
  require("dotenv").config();
  console.log("Dotenv loaded.");
} catch (e) {
  console.log("Dotenv not found (might be expected if handled in db.js)");
}

const data = JSON.stringify({
  name: "Test User",
  email: "test@example.com",
  subject: "Test Subject",
  message: "This is a test message from verification script.",
});

const options = {
  hostname: "localhost",
  port: 5000,
  path: "/api/contact",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

console.log("Sending HTTP request...");

const req = http.request(options, (res) => {
  console.log(`StatusCode: ${res.statusCode}`);

  let responseData = "";

  res.on("data", (d) => {
    responseData += d;
  });

  res.on("end", async () => {
    console.log("Response:", responseData);

    if (res.statusCode !== 201 && res.statusCode !== 200) {
      console.error("HTTP request failed status code.");
      process.exit(1);
    }

    try {
      console.log("Checking database...");
      const db = require("./db");
      const [rows] = await db.query(
        "SELECT * FROM contact_messages WHERE email = ? ORDER BY id DESC LIMIT 1",
        ["test@example.com"]
      );

      if (
        rows.length > 0 &&
        rows[0].message === "This is a test message from verification script."
      ) {
        console.log("VERIFICATION SUCCESS: Data found in database!");
        console.log("Record ID:", rows[0].id);
      } else {
        console.log("VERIFICATION FAILED: Data not found in database.");
      }
      process.exit(0);
    } catch (err) {
      console.error("Database check failed:", err.message);
      console.error(err);
      process.exit(1);
    }
  });
});

req.on("error", (error) => {
  console.error("Request Error:", error.message);
  process.exit(1);
});

req.write(data);
req.end();
