const db = require("../db");

// Mocking the import by pasting the data structure directly as CommonJS
const coursesData = [
  {
    id: 1,
    title: "Complete React Mastery",
    curriculum: [
      {
        id: 1,
        title: "Getting Started",
        lessons: [
          {
            id: 1,
            title: "Introduction to React",
            duration: "10:00",
            type: "video",
            preview: true,
            description: "What is React and why use it?",
            content:
              "<p>React is a JavaScript library for building user interfaces.</p>",
            videoUrl: "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
          },
          {
            id: 2,
            title: "React Environment Setup",
            duration: "12:00",
            type: "video",
            preview: true,
            description: "Setting up Node.js and VS Code.",
            content: "<p>Install Node.js from nodejs.org.</p>",
            videoUrl: "https://www.youtube.com/watch?v=9iAGVq_26F8",
          },
        ],
      },
      {
        id: 2,
        title: "Core Components",
        lessons: [
          {
            id: 3,
            title: "JSX Explained",
            duration: "15:00",
            type: "video",
            preview: false,
            description: "Understanding JSX syntax.",
            content: "<p>JSX allows writing HTML in JavaScript.</p>",
            videoUrl: "https://www.youtube.com/watch?v=7fPXI_MnBOY",
          },
          {
            id: 4,
            title: "Props vs State",
            duration: "18:00",
            type: "video",
            preview: false,
            description: "Managing data flow.",
            content:
              "<p>Props are passed down, State is managed internally.</p>",
            videoUrl: "https://www.youtube.com/watch?v=IJQq-ft52fM",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Python for Data Science",
    curriculum: [
      {
        id: 1,
        title: "Python Foundation",
        lessons: [
          {
            id: 1,
            title: "Python Introduction",
            duration: "15:00",
            type: "video",
            preview: true,
            description: "Why Python is great for Data Science.",
            content: "<p>Python is versatile and powerful.</p>",
            videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
          },
          {
            id: 2,
            title: "Variables and Types",
            duration: "20:00",
            type: "video",
            preview: true,
            description: "Understanding basic data types.",
            content: "<p>Integers, Floats, Strings, and Booleans.</p>",
            videoUrl: "https://www.youtube.com/watch?v=khNv69ZjSSs",
          },
        ],
      },
      {
        id: 2,
        title: "Data Structures",
        lessons: [
          {
            id: 3,
            title: "Lists and Dictionaries",
            duration: "25:00",
            type: "video",
            preview: false,
            description: "Storing collections of data.",
            content:
              "<p>Lists are ordered, Dictionaries are key-value pairs.</p>",
            videoUrl: "https://www.youtube.com/watch?v=9OeznAkyQz4",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    curriculum: [
      {
        id: 1,
        title: "Design Basics",
        lessons: [
          {
            id: 1,
            title: "What is UI/UX?",
            duration: "12:00",
            type: "video",
            preview: true,
            description: "Difference between UI and UX.",
            content: "<p>UI is how it looks, UX is how it feels.</p>",
            videoUrl: "https://www.youtube.com/watch?v=c9Wg6Cb_YlU",
          },
          {
            id: 2,
            title: "Color Theory",
            duration: "15:00",
            type: "video",
            preview: true,
            description: "Using colors effectively.",
            content: "<p>Colors evoke emotions and guide users.</p>",
            videoUrl: "https://www.youtube.com/watch?v=AvgCkHrcj90",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Business Strategy & Growth",
    curriculum: [
      {
        id: 1,
        title: "Strategy 101",
        lessons: [
          {
            id: 1,
            title: "What is Strategy?",
            duration: "10:00",
            type: "video",
            preview: true,
            description: "Defining business strategy.",
            content: "<p>Strategy is a plan of action.</p>",
            videoUrl: "https://www.youtube.com/watch?v=TD7WSLeQtVw",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Flutter Development",
    curriculum: [
      {
        id: 1,
        title: "Flutter Intro",
        lessons: [
          {
            id: 1,
            title: "Flutter Crash Course",
            duration: "30:00",
            type: "video",
            preview: true,
            description: "Building your first app.",
            content: "<p>Flutter uses Dart.</p>",
            videoUrl: "https://www.youtube.com/watch?v=x0uinJvhNxI",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Advanced JavaScript",
    curriculum: [
      {
        id: 1,
        title: "JS Internals",
        lessons: [
          {
            id: 1,
            title: "Event Loop",
            duration: "20:00",
            type: "video",
            preview: true,
            description: "How JS execution works.",
            content: "<p>JavaScript is single threaded.</p>",
            videoUrl: "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Node.js Backend Development",
    curriculum: [
      {
        id: 1,
        title: "Node.js Basics",
        lessons: [
          {
            id: 1,
            title: "Node.js Tutorial",
            duration: "40:00",
            type: "video",
            preview: true,
            description: "Server side JS.",
            content: "<p>Node.js is a runtime.</p>",
            videoUrl: "https://www.youtube.com/watch?v=Oe421EPjeBE",
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title: "Vue.js Complete Guide",
    curriculum: [
      {
        id: 1,
        title: "Vue Essentials",
        lessons: [
          {
            id: 1,
            title: "Vue.js 3 Crash Course",
            duration: "35:00",
            type: "video",
            preview: true,
            description: "Learning Vue 3.",
            content: "<p>Vue is progressive.</p>",
            videoUrl: "https://www.youtube.com/watch?v=qZXt1Aom3Cs",
          },
        ],
      },
    ],
  },
  {
    id: 9,
    title: "Angular Framework Mastery",
    curriculum: [
      {
        id: 1,
        title: "Angular Intro",
        lessons: [
          {
            id: 1,
            title: "Angular for Beginners",
            duration: "45:00",
            type: "video",
            preview: true,
            description: "Building with Angular.",
            content: "<p>Angular is a platform.</p>",
            videoUrl: "https://www.youtube.com/watch?v=3qBXWUpoPHo",
          },
        ],
      },
    ],
  },
  {
    id: 10,
    title: "Machine Learning with Python",
    curriculum: [
      {
        id: 1,
        title: "ML Concepts",
        lessons: [
          {
            id: 1,
            title: "Machine Learning Basics",
            duration: "25:00",
            type: "video",
            preview: true,
            description: "What is ML?",
            content: "<p>Computers learning from data.</p>",
            videoUrl: "https://www.youtube.com/watch?v=GwIo3gDZCVQ",
          },
        ],
      },
    ],
  },
  {
    id: 11,
    title: "Deep Learning Fundamentals",
    curriculum: [
      {
        id: 1,
        title: "Neural Networks",
        lessons: [
          {
            id: 1,
            title: "Intro to Deep Learning",
            duration: "30:00",
            type: "video",
            preview: true,
            description: "How Neural Nets work.",
            content: "<p>Inspired by the brain.</p>",
            videoUrl: "https://www.youtube.com/watch?v=VyWAvY2CF9c",
          },
        ],
      },
    ],
  },
  {
    id: 12,
    title: "Data Analysis with Pandas",
    curriculum: [
      {
        id: 1,
        title: "Pandas Intro",
        lessons: [
          {
            id: 1,
            title: "Pandas Tutorial",
            duration: "20:00",
            type: "video",
            preview: true,
            description: "Data Analysis in Python.",
            content: "<p>Pandas is essential.</p>",
            videoUrl: "https://www.youtube.com/watch?v=vmEHCJofslg",
          },
        ],
      },
    ],
  },
  {
    id: 18,
    title: "Ethical Hacking",
    curriculum: [
      {
        id: 1,
        title: "Hacking Basics",
        lessons: [
          {
            id: 1,
            title: "Ethical Hacking 101",
            duration: "30:00",
            type: "video",
            preview: true,
            description: "Intro to cybersecurity.",
            content: "<p>Hacking legally.</p>",
            videoUrl: "https://www.youtube.com/watch?v=3Kq1MIfTWCE",
          },
        ],
      },
    ],
  },
  {
    id: 19,
    title: "Cybersecurity Essentials",
    curriculum: [
      {
        id: 1,
        title: "Security Fundamentals",
        lessons: [
          {
            id: 1,
            title: "Cyber Security Full Course",
            duration: "60:00",
            type: "video",
            preview: true,
            description: "Complete overview.",
            content: "<p>Protecting systems.</p>",
            videoUrl: "https://www.youtube.com/watch?v=Nz1439g06aI",
          },
        ],
      },
    ],
  },
  {
    id: 20,
    title: "iOS Development with Swift",
    curriculum: [
      {
        id: 1,
        title: "Swift Intro",
        lessons: [
          {
            id: 1,
            title: "Swift Programming Tutorial",
            duration: "25:00",
            type: "video",
            preview: true,
            description: "Learning Swift.",
            content: "<p>Apple's language.</p>",
            videoUrl: "https://www.youtube.com/watch?v=Ulp1Kimblg0",
          },
        ],
      },
    ],
  },
  {
    id: 23,
    title: "Figma UI Design",
    curriculum: [
      {
        id: 1,
        title: "Figma Basics",
        lessons: [
          {
            id: 1,
            title: "Figma Tutorial for Beginners",
            duration: "20:00",
            type: "video",
            preview: true,
            description: "Start designing.",
            content: "<p>Figma is collaborative.</p>",
            videoUrl: "https://www.youtube.com/watch?v=FTl56jYh67Q",
          },
        ],
      },
    ],
  },
  {
    id: 24,
    title: "Adobe XD Mastery",
    curriculum: [
      {
        id: 1,
        title: "XD Intro",
        lessons: [
          {
            id: 1,
            title: "Adobe XD Tutorial",
            duration: "15:00",
            type: "video",
            preview: true,
            description: "Prototyping tools.",
            content: "<p>Adobe's UX solution.</p>",
            videoUrl: "https://www.youtube.com/watch?v=68w2VwalD5w",
          },
        ],
      },
    ],
  },
  {
    id: 35,
    title: "TypeScript Advanced",
    curriculum: [
      {
        id: 1,
        title: "TS Advanced",
        lessons: [
          {
            id: 1,
            title: "TypeScript Course",
            duration: "40:00",
            type: "video",
            preview: true,
            description: "Beyond the basics.",
            content: "<p>Types at scale.</p>",
            videoUrl: "https://www.youtube.com/watch?v=BwuLxPH8IDs",
          },
        ],
      },
    ],
  },
];

async function seedCurriculum() {
  try {
    console.log("Seeding full curriculum...");

    for (const courseData of coursesData) {
      // 1. Find the course ID by TITLE
      const [courses] = await db.query(
        "SELECT id FROM courses WHERE title = ?",
        [courseData.title],
      );

      if (courses.length === 0) {
        console.log(
          `Skipping: Course '${courseData.title}' not found in DB table 'courses'`,
        );
        continue;
      }
      const courseId = courses[0].id;
      // console.log(`Seeding for Course: ${courseData.title} (ID: ${courseId})`);

      // 2. Check overlap
      const [existingSections] = await db.query(
        "SELECT id FROM sections WHERE course_id = ?",
        [courseId],
      );
      if (existingSections.length > 0) {
        // console.log(`  Skipping: Sections already exist for course ${courseId}`);
        continue;
      }

      // 3. Insert Sections and Lessons
      let sectionOrder = 0;
      if (!courseData.curriculum) continue;

      for (const sectionData of courseData.curriculum) {
        const [secResult] = await db.query(
          "INSERT INTO sections (course_id, title, order_index) VALUES (?, ?, ?)",
          [courseId, sectionData.title, sectionOrder++],
        );
        const sectionId = secResult.insertId;
        // console.log(`  Added Section: ${sectionData.title}`);

        let lessonOrder = 0;
        for (const lessonData of sectionData.lessons) {
          await db.query(
            "INSERT INTO lessons (section_id, title, duration, video_url, content, type, is_preview, order_index) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [
              sectionId,
              lessonData.title,
              lessonData.duration,
              lessonData.videoUrl,
              lessonData.content,
              lessonData.type,
              lessonData.preview,
              lessonOrder++,
            ],
          );
        }
      }
      console.log(`Seeded fully: ${courseData.title}`);
    }

    console.log("Full seeding completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding:", error);
    process.exit(1);
  }
}

seedCurriculum();
