import { getInstructorAvatar } from '../utils/images';

export const coursesData = [
  {
    id: 1,
    title: 'Complete React Mastery',
    instructor: {
      name: 'John Doe',
      title: 'Senior Frontend Engineer',
      bio: 'John is a seasoned frontend developer with over 10 years of experience building scalable web applications.',
    },
    category: 'web',
    image: '/images/courses/react.png',
    curriculum: [
      {
        id: 1,
        title: 'Getting Started',
        lessons: [
          { id: 1, title: 'Introduction to React', duration: '10:00', type: 'video', preview: true, description: 'What is React and why use it?', content: '<p>React is a JavaScript library for building user interfaces.</p>', videoUrl: 'https://www.youtube.com/watch?v=Tn6-PIqc4UM' },
          { id: 2, title: 'React Environment Setup', duration: '12:00', type: 'video', preview: true, description: 'Setting up Node.js and VS Code.', content: '<p>Install Node.js from nodejs.org.</p>', videoUrl: 'https://www.youtube.com/watch?v=9iAGVq_26F8' }
        ]
      },
      {
        id: 2,
        title: 'Core Components',
        lessons: [
            { id: 3, title: 'JSX Explained', duration: '15:00', type: 'video', preview: false, description: 'Understanding JSX syntax.', content: '<p>JSX allows writing HTML in JavaScript.</p>', videoUrl: 'https://www.youtube.com/watch?v=7fPXI_MnBOY' },
            { id: 4, title: 'Props vs State', duration: '18:00', type: 'video', preview: false, description: 'Managing data flow.', content: '<p>Props are passed down, State is managed internally.</p>', videoUrl: 'https://www.youtube.com/watch?v=IJQq-ft52fM' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Python for Data Science',
    instructor: {
      name: 'Jane Smith',
      title: 'Data Scientist @ Google',
    },
    category: 'data',
    image: '/images/courses/python.png',
    curriculum: [
        {
          id: 1,
          title: 'Python Foundation',
          lessons: [
            { id: 1, title: 'Python Introduction', duration: '15:00', type: 'video', preview: true, description: 'Why Python is great for Data Science.', content: '<p>Python is versatile and powerful.</p>', videoUrl: 'https://www.youtube.com/watch?v=rfscVS0vtbw' },
            { id: 2, title: 'Variables and Types', duration: '20:00', type: 'video', preview: true, description: 'Understanding basic data types.', content: '<p>Integers, Floats, Strings, and Booleans.</p>', videoUrl: 'https://www.youtube.com/watch?v=khNv69ZjSSs' }
          ]
        },
        {
           id: 2,
           title: 'Data Structures',
           lessons: [
               { id: 3, title: 'Lists and Dictionaries', duration: '25:00', type: 'video', preview: false, description: 'Storing collections of data.', content: '<p>Lists are ordered, Dictionaries are key-value pairs.</p>', videoUrl: 'https://www.youtube.com/watch?v=9OeznAkyQz4' }
           ]
        }
    ]
  },
  {
    id: 3,
    title: 'UI/UX Design Fundamentals',
    instructor: { name: 'Sarah Johnson' },
    category: 'design',
    image: '/images/courses/uiux.png',
    curriculum: [
        {
            id: 1,
            title: 'Design Basics',
            lessons: [
                { id: 1, title: 'What is UI/UX?', duration: '12:00', type: 'video', preview: true, description: 'Difference between UI and UX.', content: '<p>UI is how it looks, UX is how it feels.</p>', videoUrl: 'https://www.youtube.com/watch?v=c9Wg6Cb_YlU' },
                { id: 2, title: 'Color Theory', duration: '15:00', type: 'video', preview: true, description: 'Using colors effectively.', content: '<p>Colors evoke emotions and guide users.</p>', videoUrl: 'https://www.youtube.com/watch?v=AvgCkHrcj90' }
            ]
        }
    ]
  },
  { 
      id: 4, 
      title: 'Business Strategy & Growth', 
      instructor: { name: 'Michael Brown' }, 
      category: 'business', 
      image: '/images/courses/business.png',
      curriculum: [
          {
              id: 1,
              title: 'Strategy 101',
              lessons: [
                  { id: 1, title: 'What is Strategy?', duration: '10:00', type: 'video', preview: true, description: 'Defining business strategy.', content: '<p>Strategy is a plan of action.</p>', videoUrl: 'https://www.youtube.com/watch?v=TD7WSLeQtVw' }
              ]
          }
      ]
  },
  { 
      id: 5, 
      title: 'Flutter Development', 
      instructor: { name: 'David Wilson' }, 
      category: 'mobile', 
      image: '/images/courses/flutter.png',
      curriculum: [
          {
              id: 1,
              title: 'Flutter Intro',
              lessons: [
                  { id: 1, title: 'Flutter Crash Course', duration: '30:00', type: 'video', preview: true, description: 'Building your first app.', content: '<p>Flutter uses Dart.</p>', videoUrl: 'https://www.youtube.com/watch?v=x0uinJvhNxI' }
              ]
          }
      ]
  },
  { 
      id: 6, 
      title: 'Advanced JavaScript', 
      instructor: { name: 'Emily Davis' }, 
      category: 'web', 
      image: '/images/courses/javascript.png',
      curriculum: [
          {
              id: 1,
              title: 'JS Internals',
              lessons: [
                  { id: 1, title: 'Event Loop', duration: '20:00', type: 'video', preview: true, description: 'How JS execution works.', content: '<p>JavaScript is single threaded.</p>', videoUrl: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ' }
              ]
          }
      ]
  },
  { 
      id: 7, 
      title: 'Node.js Backend Development', 
      instructor: { name: 'Robert Taylor' }, 
      category: 'web', 
      image: '/images/courses/nodejs.png',
      curriculum: [
          {
              id: 1,
              title: 'Node.js Basics',
              lessons: [
                  { id: 1, title: 'Node.js Tutorial', duration: '40:00', type: 'video', preview: true, description: 'Server side JS.', content: '<p>Node.js is a runtime.</p>', videoUrl: 'https://www.youtube.com/watch?v=Oe421EPjeBE' }
              ]
          }
      ]
  },
  { 
      id: 8, 
      title: 'Vue.js Complete Guide', 
      instructor: { name: 'Lisa Anderson' }, 
      category: 'web', 
      image: '/images/courses/vuejs.png',
      curriculum: [
          {
              id: 1,
              title: 'Vue Essentials',
              lessons: [
                  { id: 1, title: 'Vue.js 3 Crash Course', duration: '35:00', type: 'video', preview: true, description: 'Learning Vue 3.', content: '<p>Vue is progressive.</p>', videoUrl: 'https://www.youtube.com/watch?v=qZXt1Aom3Cs' }
              ]
          }
      ]
  },
  { 
      id: 9, 
      title: 'Angular Framework Mastery', 
      instructor: { name: 'James White' }, 
      category: 'web', 
      image: '/images/courses/angular.png',
      curriculum: [
          {
              id: 1,
              title: 'Angular Intro',
              lessons: [
                  { id: 1, title: 'Angular for Beginners', duration: '45:00', type: 'video', preview: true, description: 'Building with Angular.', content: '<p>Angular is a platform.</p>', videoUrl: 'https://www.youtube.com/watch?v=3qBXWUpoPHo' }
              ]
          }
      ]
  },
  { 
      id: 10, 
      title: 'Machine Learning with Python', 
      instructor: { name: 'Dr. Alex Chen' }, 
      category: 'ai', 
      image: '/images/courses/machine-learning.png',
      curriculum: [
          {
              id: 1,
              title: 'ML Concepts',
              lessons: [
                  { id: 1, title: 'Machine Learning Basics', duration: '25:00', type: 'video', preview: true, description: 'What is ML?', content: '<p>Computers learning from data.</p>', videoUrl: 'https://www.youtube.com/watch?v=GwIo3gDZCVQ' }
              ]
          }
      ]
  },
  { 
      id: 11, 
      title: 'Deep Learning Fundamentals', 
      instructor: { name: 'Dr. Maria Garcia' }, 
      category: 'ai', 
      image: '/images/courses/deep-learning.png',
      curriculum: [
          {
              id: 1,
              title: 'Neural Networks',
              lessons: [
                  { id: 1, title: 'Intro to Deep Learning', duration: '30:00', type: 'video', preview: true, description: 'How Neural Nets work.', content: '<p>Inspired by the brain.</p>', videoUrl: 'https://www.youtube.com/watch?v=VyWAvY2CF9c' }
              ]
          }
      ]
  },
  { 
      id: 12, 
      title: 'Data Analysis with Pandas', 
      instructor: { name: 'Chris Lee' }, 
      category: 'data', 
      image: '/images/courses/pandas.png',
      curriculum: [
          {
              id: 1,
              title: 'Pandas Intro',
              lessons: [
                  { id: 1, title: 'Pandas Tutorial', duration: '20:00', type: 'video', preview: true, description: 'Data Analysis in Python.', content: '<p>Pandas is essential.</p>', videoUrl: 'https://www.youtube.com/watch?v=vmEHCJofslg' }
              ]
          }
      ]
  },
  { 
      id: 18, 
      title: 'Ethical Hacking', 
      instructor: { name: 'Kevin Brown' }, 
      category: 'cyber', 
      image: '/images/courses/ethical-hacking.png',
      curriculum: [
          {
              id: 1,
              title: 'Hacking Basics',
              lessons: [
                  { id: 1, title: 'Ethical Hacking 101', duration: '30:00', type: 'video', preview: true, description: 'Intro to cybersecurity.', content: '<p>Hacking legally.</p>', videoUrl: 'https://www.youtube.com/watch?v=3Kq1MIfTWCE' }
              ]
          }
      ]
  },
  { 
      id: 19, 
      title: 'Cybersecurity Essentials', 
      instructor: { name: 'Nicole Davis' }, 
      category: 'cyber', 
      image: '/images/courses/cybersecurity.png',
      curriculum: [
          {
              id: 1,
              title: 'Security Fundamentals',
              lessons: [
                  { id: 1, title: 'Cyber Security Full Course', duration: '60:00', type: 'video', preview: true, description: 'Complete overview.', content: '<p>Protecting systems.</p>', videoUrl: 'https://www.youtube.com/watch?v=Nz1439g06aI' }
              ]
          }
      ]
  },
  { 
      id: 20, 
      title: 'iOS Development with Swift', 
      instructor: { name: 'Daniel Lee' }, 
      category: 'mobile', 
      image: '/images/courses/ios.png',
      curriculum: [
          {
              id: 1,
              title: 'Swift Intro',
              lessons: [
                  { id: 1, title: 'Swift Programming Tutorial', duration: '25:00', type: 'video', preview: true, description: 'Learning Swift.', content: '<p>Apple\'s language.</p>', videoUrl: 'https://www.youtube.com/watch?v=Ulp1Kimblg0' }
              ]
          }
      ]
  },
  { 
      id: 23, 
      title: 'Figma UI Design', 
      instructor: { name: 'Emma Johnson' }, 
      category: 'design', 
      image: '/images/courses/figma.png',
      curriculum: [
          {
              id: 1,
              title: 'Figma Basics',
              lessons: [
                  { id: 1, title: 'Figma Tutorial for Beginners', duration: '20:00', type: 'video', preview: true, description: 'Start designing.', content: '<p>Figma is collaborative.</p>', videoUrl: 'https://www.youtube.com/watch?v=FTl56jYh67Q' }
              ]
          }
      ]
  },
  { 
      id: 24, 
      title: 'Adobe XD Mastery', 
      instructor: { name: 'William Smith' }, 
      category: 'design', 
      image: '/images/courses/adobe-xd.png',
      curriculum: [
          {
              id: 1,
              title: 'XD Intro',
              lessons: [
                  { id: 1, title: 'Adobe XD Tutorial', duration: '15:00', type: 'video', preview: true, description: 'Prototyping tools.', content: '<p>Adobe\'s UX solution.</p>', videoUrl: 'https://www.youtube.com/watch?v=68w2VwalD5w' }
              ]
          }
      ]
  },
  { 
      id: 35, 
      title: 'TypeScript Advanced', 
      instructor: { name: 'Brian O\'Connor' }, 
      category: 'web', 
      image: '/images/courses/typescript.png',
      curriculum: [
          {
              id: 1,
              title: 'TS Advanced',
              lessons: [
                  { id: 1, title: 'TypeScript Course', duration: '40:00', type: 'video', preview: true, description: 'Beyond the basics.', content: '<p>Types at scale.</p>', videoUrl: 'https://www.youtube.com/watch?v=BwuLxPH8IDs' }
              ]
          }
      ]
  }
].map(course => ({
    ...course,
    rating: course.rating || 4.7,
    students: course.students || 10000,
    price: course.price || 999,
    duration: course.duration || '20 hours',
    level: course.level || 'Beginner',
    totalRatings: course.totalRatings || 500,
    description: course.description || `Master ${course.title} with this comprehensive course.`,
    whatYouWillLearn: course.whatYouWillLearn || ['Core Concepts', 'Practical Projects', 'Industry Best Practices'],
    reviews: [
        {
            id: 1,
            user: { name: 'Student', avatar: 'https://ui-avatars.com/api/?name=Student' },
            rating: 5,
            date: '2024-01-01',
            comment: 'Great course! learned a lot.'
        }
    ],
    instructor: {
        name: 'Instructor', 
        title: 'Expert',
        ...course.instructor,
        bio: course.instructor?.bio || `${course.instructor?.name || 'The instructor'} is a leading expert in ${course.category}.`,
        rating: 4.8,
        students: 20000,
        courses: 5,
        credentials: ['Industry Expert', 'Certified Instructor']
    }
}));
