const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const db = require("../db");

const courses = [
  {
    title: "Complete React Mastery",
    instructor: "Jhon Doe",
    category: "web",
    image_url: "/images/courses/react.png",
    price: 99.99,
    duration: "20 hours",
    description: "Master React with this comprehensive course.",
    lessons_count: 30,
    quizzes_count: 5,
  },
  {
    title: "Python for Data Science",
    instructor: "Jane Smith",
    category: "data",
    image_url: "/images/courses/python.png",
    price: 89.99,
    duration: "25 hours",
    description: "Learn Python for data analysis and visualization.",
    lessons_count: 40,
    quizzes_count: 8,
  },
  {
    title: "UI/UX Design Fundamentals",
    instructor: "Sarah Johnson",
    category: "design",
    image_url: "/images/courses/uiux.png",
    price: 79.99,
    duration: "15 hours",
    description: "Master the basics of UI/UX design.",
    lessons_count: 20,
    quizzes_count: 4,
  },
  {
    title: "Business Strategy & Growth",
    instructor: "Michael Brown",
    category: "business",
    image_url: "/images/courses/business.png",
    price: 129.99,
    duration: "30 hours",
    description: "Learn how to grow your business effectively.",
    lessons_count: 25,
    quizzes_count: 3,
  },
  {
    title: "Flutter Development",
    instructor: "David Wilson",
    category: "mobile",
    image_url: "/images/courses/flutter.png",
    price: 109.99,
    duration: "40 hours",
    description: "Build native mobile apps with Flutter.",
    lessons_count: 35,
    quizzes_count: 6,
  },
  {
    title: "Advanced JavaScript",
    instructor: "Emily Davis",
    category: "web",
    image_url: "/images/courses/javascript.png",
    price: 99.99,
    duration: "22 hours",
    description: "Deep dive into JavaScript concepts.",
    lessons_count: 28,
    quizzes_count: 4,
  },
  {
    title: "Node.js Backend Development",
    instructor: "Robert Taylor",
    category: "web",
    image_url: "/images/courses/nodejs.png",
    price: 119.99,
    duration: "28 hours",
    description: "Build scalable backends with Node.js.",
    lessons_count: 32,
    quizzes_count: 5,
  },
  {
    title: "Vue.js Complete Guide",
    instructor: "Lisa Anderson",
    category: "web",
    image_url: "/images/courses/vuejs.png",
    price: 94.99,
    duration: "18 hours",
    description: "Master Vue.js framework.",
    lessons_count: 24,
    quizzes_count: 3,
  },
  {
    title: "Angular Framework Mastery",
    instructor: "James White",
    category: "web",
    image_url: "/images/courses/angular.png",
    price: 104.99,
    duration: "26 hours",
    description: "Comprehensive guide to Angular.",
    lessons_count: 30,
    quizzes_count: 4,
  },
  {
    title: "Machine Learning with Python",
    instructor: "Dr. Alex Chen",
    category: "ai",
    image_url: "/images/courses/machine-learning.png",
    price: 149.99,
    duration: "45 hours",
    description: "Introduction to Machine Learning.",
    lessons_count: 50,
    quizzes_count: 10,
  },
  {
    title: "Deep Learning Fundamentals",
    instructor: "Dr. Maria Garcia",
    category: "ai",
    image_url: "/images/courses/deep-learning.png",
    price: 159.99,
    duration: "50 hours",
    description:
      "Dive deep into neural networks and deep learning architectures.",
    lessons_count: 55,
    quizzes_count: 12,
  },
  {
    title: "Data Analysis with Pandas",
    instructor: "Chris Lee",
    category: "data",
    image_url: "/images/courses/pandas.png",
    price: 84.99,
    duration: "18 hours",
    description:
      "Become an expert in data manipulation and analysis using Pandas.",
    lessons_count: 22,
    quizzes_count: 4,
  },
  {
    title: "Ethical Hacking",
    instructor: "Kevin Brown",
    category: "cyber",
    image_url: "/images/courses/ethical-hacking.png",
    price: 139.99,
    duration: "35 hours",
    description: "Learn ethical hacking techniques and cybersecurity defenses.",
    lessons_count: 42,
    quizzes_count: 7,
  },
  {
    title: "Cybersecurity Essentials",
    instructor: "Nicole Davis",
    category: "cyber",
    image_url: "/images/courses/cybersecurity.png",
    price: 119.99,
    duration: "28 hours",
    description: "Fundamental concepts for a career in cybersecurity.",
    lessons_count: 30,
    quizzes_count: 5,
  },
  {
    title: "iOS Development with Swift",
    instructor: "Daniel Lee",
    category: "mobile",
    image_url: "/images/courses/ios.png",
    price: 129.99,
    duration: "42 hours",
    description: "Build professional iOS apps using Swift and SwiftUI.",
    lessons_count: 45,
    quizzes_count: 8,
  },
  {
    title: "Figma UI Design",
    instructor: "Emma Johnson",
    category: "design",
    image_url: "/images/courses/figma.png",
    price: 79.99,
    duration: "16 hours",
    description: "Master Figma for modern UI and UX design.",
    lessons_count: 20,
    quizzes_count: 3,
  },
  {
    title: "Adobe XD Mastery",
    instructor: "William Smith",
    category: "design",
    image_url: "/images/courses/adobe-xd.png",
    price: 74.99,
    duration: "14 hours",
    description: "Learn prototyping and design with Adobe XD.",
    lessons_count: 18,
    quizzes_count: 3,
  },
  {
    title: "TypeScript Advanced",
    instructor: "Brian O'Connor",
    category: "web",
    image_url: "/images/courses/typescript.png",
    price: 109.99,
    duration: "24 hours",
    description: "Unlock the full potential of TypeScript in your projects.",
    lessons_count: 26,
    quizzes_count: 5,
  },
];

const seed = async () => {
  try {
    console.log("Seeding courses...");

    // Optional: clear existing courses to ensure clean state (user asked to "make it perfect")
    // await db.query("DELETE FROM courses");
    // BUT this might break existing enrollments. Better to update or insert.

    for (const course of courses) {
      // Check if course exists by title
      const [existing] = await db.query(
        "SELECT id FROM courses WHERE title = ?",
        [course.title],
      );

      if (existing.length === 0) {
        await db.query(
          "INSERT INTO courses (title, instructor, category, image_url, price, duration, description, lessons_count, quizzes_count) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            course.title,
            course.instructor,
            course.category,
            course.image_url,
            course.price,
            course.duration,
            course.description,
            course.lessons_count,
            course.quizzes_count,
          ],
        );
        console.log(`Added: ${course.title}`);
      } else {
        // Update existing record with new fields
        await db.query(
          "UPDATE courses SET instructor=?, category=?, image_url=?, price=?, duration=?, description=?, lessons_count=?, quizzes_count=? WHERE id=?",
          [
            course.instructor,
            course.category,
            course.image_url,
            course.price,
            course.duration,
            course.description,
            course.lessons_count,
            course.quizzes_count,
            existing[0].id,
          ],
        );
        console.log(`Updated: ${course.title}`);
      }
    }
    console.log("Seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seed();
