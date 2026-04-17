const db = require("../db");

const coursesData = [
  {
    id: 2,
    title: "Python for Data Science",
    description: "Learn Python for data analysis and visualization.",
    instructor: "Jane Smith",
    duration: "25 hours",
    price: 89.99,
    image_url: "/images/courses/python.png",
    category: "data",
    lessons_count: 40,
    quizzes_count: 8,
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description: "Master the basics of UI/UX design.",
    instructor: "Sarah Johnson",
    duration: "15 hours",
    price: 79.99,
    image_url: "/images/courses/uiux.png",
    category: "design",
    lessons_count: 20,
    quizzes_count: 4,
  },
  {
    id: 4,
    title: "Business Strategy & Growth",
    description: "Learn how to grow your business effectively.",
    instructor: "Michael Brown",
    duration: "30 hours",
    price: 129.99,
    image_url: "/images/courses/business.png",
    category: "business",
    lessons_count: 25,
    quizzes_count: 3,
  },
  {
    id: 5,
    title: "Flutter Development",
    description: "Build native mobile apps with Flutter.",
    instructor: "David Wilson",
    duration: "40 hours",
    price: 109.99,
    image_url: "/images/courses/flutter.png",
    category: "mobile",
    lessons_count: 35,
    quizzes_count: 6,
  },
  {
    id: 6,
    title: "Advanced JavaScript",
    description: "Deep dive into JavaScript concepts.",
    instructor: "Emily Davis",
    duration: "22 hours",
    price: 99.99,
    image_url: "/images/courses/javascript.png",
    category: "web",
    lessons_count: 28,
    quizzes_count: 4,
  },
  {
    id: 7,
    title: "Node.js Backend Development",
    description: "Build scalable backends with Node.js.",
    instructor: "Robert Taylor",
    duration: "28 hours",
    price: 119.99,
    image_url: "/images/courses/nodejs.png",
    category: "web",
    lessons_count: 32,
    quizzes_count: 5,
  },
  {
    id: 8,
    title: "Vue.js Complete Guide",
    description: "Master Vue.js framework.",
    instructor: "Lisa Anderson",
    duration: "18 hours",
    price: 94.99,
    image_url: "/images/courses/vuejs.png",
    category: "web",
    lessons_count: 24,
    quizzes_count: 3,
  },
  {
    id: 9,
    title: "Angular Framework Mastery",
    description: "Comprehensive guide to Angular.",
    instructor: "James White",
    duration: "26 hours",
    price: 104.99,
    image_url: "/images/courses/angular.png",
    category: "web",
    lessons_count: 30,
    quizzes_count: 4,
  },
  {
    id: 10,
    title: "Machine Learning with Python",
    description: "Introduction to Machine Learning.",
    instructor: "Dr. Alex Chen",
    duration: "45 hours",
    price: 149.99,
    image_url: "/images/courses/machine-learning.png",
    category: "ai",
    lessons_count: 50,
    quizzes_count: 10,
  },
  {
    id: 11,
    title: "Deep Learning Fundamentals",
    description: "Dive deep into neural networks and deep learning architectures.",
    instructor: "Dr. Maria Garcia",
    duration: "50 hours",
    price: 159.99,
    image_url: "/images/courses/deep-learning.png",
    category: "ai",
    lessons_count: 55,
    quizzes_count: 12,
  },
  {
    id: 12,
    title: "Data Analysis with Pandas",
    description: "Become an expert in data manipulation and analysis using Pandas.",
    instructor: "Chris Lee",
    duration: "18 hours",
    price: 84.99,
    image_url: "/images/courses/pandas.png",
    category: "data",
    lessons_count: 22,
    quizzes_count: 4,
  },
  {
    id: 18,
    title: "Ethical Hacking",
    description: "Learn ethical hacking techniques and cybersecurity defenses.",
    instructor: "Kevin Brown",
    duration: "35 hours",
    price: 139.99,
    image_url: "/images/courses/ethical-hacking.png",
    category: "cyber",
    lessons_count: 42,
    quizzes_count: 7,
  },
  {
    id: 19,
    title: "Cybersecurity Essentials",
    description: "Fundamental concepts for a career in cybersecurity.",
    instructor: "Nicole Davis",
    duration: "28 hours",
    price: 119.99,
    image_url: "/images/courses/cybersecurity.png",
    category: "cyber",
    lessons_count: 30,
    quizzes_count: 5,
  },
  {
    id: 20,
    title: "iOS Development with Swift",
    description: "Build professional iOS apps using Swift and SwiftUI.",
    instructor: "Daniel Lee",
    duration: "42 hours",
    price: 129.99,
    image_url: "/images/courses/ios.png",
    category: "mobile",
    lessons_count: 45,
    quizzes_count: 8,
  },
  {
    id: 23,
    title: "Figma UI Design",
    description: "Master Figma for modern UI and UX design.",
    instructor: "Emma Johnson",
    duration: "16 hours",
    price: 79.99,
    image_url: "/images/courses/figma.png",
    category: "design",
    lessons_count: 20,
    quizzes_count: 3,
  },
  {
    id: 24,
    title: "Adobe XD Mastery",
    description: "Learn prototyping and design with Adobe XD.",
    instructor: "William Smith",
    duration: "14 hours",
    price: 74.99,
    image_url: "/images/courses/adobe-xd.png",
    category: "design",
    lessons_count: 18,
    quizzes_count: 3,
  },
  {
    id: 35,
    title: "TypeScript Advanced",
    description: "Unlock the full potential of TypeScript in your projects.",
    instructor: "Brian O'Connor",
    duration: "24 hours",
    price: 109.99,
    image_url: "/images/courses/typescript.png",
    category: "web",
    lessons_count: 26,
    quizzes_count: 5,
  },
  {
    id: 36,
    title: "Introduction to JavaScript",
    description: "Learn JavaScript from scratch",
    instructor: "Jane Smith",
    duration: "8 weeks",
    price: 2999.00,
    image_url: "https://example.com/image.jpg",
    category: "Programming",
    lessons_count: 40,
    quizzes_count: 8,
  },
  {
    id: 38,
    title: "Complete React Mastery",
    description: "Master React with this comprehensive course.",
    instructor: "Jhon Doe",
    duration: "20 hours",
    price: 99.99,
    image_url: "/images/courses/react.png",
    category: "web",
    lessons_count: 30,
    quizzes_count: 5,
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

module.exports = seedCourses;

if (require.main === module) {
  seedCourses();
}
