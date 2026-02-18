const fetch = require("node-fetch");

async function deleteCourse(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    if (data.success) {
      console.log(`Successfully deleted course ID ${id}`);
    } else {
      console.log(`Failed to delete course ID ${id}: ${data.message}`);
    }
  } catch (error) {
    console.error(`Error deleting course ID ${id}:`, error.message);
  }
}

async function run() {
  const ids = [1, 2, 4];
  for (const id of ids) {
    await deleteCourse(id);
  }
}

run();
