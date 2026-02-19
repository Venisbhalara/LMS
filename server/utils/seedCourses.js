const db = require("../db");

const coursesData = [
  {
    id: 1,
    title: "Complete React Mastery",
    instructor: "Jhon Doe",
    price: 4999,
    duration: "20 hours",
  },
  {
    id: 2,
    title: "Python for Data Science",
    instructor: "Jane Smith",
    price: 3499,
    duration: "20 hours",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Sarah Johnson",
    price: 2999,
    duration: "20 hours",
  },
  {
    id: 4,
    title: "Business Strategy & Growth",
    instructor: "Michael Brown",
    price: 1999,
    duration: "20 hours",
  },
  {
    id: 5,
    title: "Flutter Development",
    instructor: "David Wilson",
    price: 3999,
    duration: "20 hours",
  },
  {
    id: 6,
    title: "Advanced JavaScript",
    instructor: "Emily Davis",
    price: 2499,
    duration: "20 hours",
  },
  {
    id: 7,
    title: "Node.js Backend Development",
    instructor: "Robert Taylor",
    price: 2499,
    duration: "20 hours",
  },
  {
    id: 8,
    title: "Vue.js Complete Guide",
    instructor: "Lisa Anderson",
    price: 1999,
    duration: "20 hours",
  },
  {
    id: 9,
    title: "Angular Framework Mastery",
    instructor: "James White",
    price: 3499,
    duration: "20 hours",
  },
  {
    id: 10,
    title: "Machine Learning with Python",
    instructor: "Dr. Alex Chen",
    price: 5999,
    duration: "20 hours",
  },
  {
    id: 11,
    title: "Deep Learning Fundamentals",
    instructor: "Dr. Maria Garcia",
    price: 6999,
    duration: "20 hours",
  },
  {
    id: 12,
    title: "Data Analysis with Pandas",
    instructor: "Chris Lee",
    price: 2999,
    duration: "20 hours",
  },
  {
    id: 18,
    title: "Ethical Hacking",
    instructor: "Kevin Brown",
    price: 4499,
    duration: "20 hours",
  },
  {
    id: 19,
    title: "Cybersecurity Essentials",
    instructor: "Nicole Davis",
    price: 3999,
    duration: "20 hours",
  },
  {
    id: 20,
    title: "iOS Development with Swift",
    instructor: "Daniel Lee",
    price: 5499,
    duration: "20 hours",
  },
  {
    id: 23,
    title: "Figma UI Design",
    instructor: "Emma Johnson",
    price: 1499,
    duration: "20 hours",
  },
  {
    id: 24,
    title: "Adobe XD Mastery",
    instructor: "William Smith",
    price: 1499,
    duration: "20 hours",
  },
  {
    id: 35,
    title: "TypeScript Advanced",
    instructor: "Brian O'Connor",
    price: 2499,
    duration: "20 hours",
  },
];

async function seedCourses() {
  try {
    console.log("Clearing existing courses...");
    // Disable foreign key checks to allow truncating courses even if enrollments exist
    await db.query("SET FOREIGN_KEY_CHECKS = 0");
    // We truncate to reset auto-increment and remove garbage
    await db.query("TRUNCATE TABLE courses");
    await db.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("Seeding new courses...");
    for (const course of coursesData) {
      // Use INSERT INTO ... (id, ...) to explicitly set IDs
      await db.query(
        "INSERT INTO courses (id, title, instructor, price, duration, description) VALUES (?, ?, ?, ?, ?, ?)",
        [
          course.id,
          course.title,
          course.instructor,
          course.price,
          course.duration,
          `Master ${course.title} with this comprehensive course.`,
        ],
      );
    }

    console.log(
      "✓ Successfully seeded database with " + coursesData.length + " courses.",
    );
    process.exit(0);
  } catch (error) {
    console.error("Error seeding courses:", error);
    process.exit(1);
  }
}

seedCourses();
