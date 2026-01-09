export const quizzes = {
  react: {
    id: "react",
    title: "React Mastery Quiz",
    description: "Test your knowledge of React hooks, components, and state management.",
    totalQuestions: 15,
    duration: 600, // 10 minutes
    passPercentage: 70,
    questions: [
      {
        id: 1,
        question: "What is the primary purpose of React?",
        options: ["Server-side routing", "Building user interfaces", "Database management", "Data analysis"],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which hook is used for side effects in a functional component?",
        options: ["useState", "useReducer", "useEffect", "useContext"],
        correctAnswer: 2
      },
      {
        id: 3,
        question: "What is JSX?",
        options: ["A new HTML standard", "A syntax extension for JavaScript", "A database query language", "A CSS preprocessor"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "How do you pass data from a parent component to a child component?",
        options: ["State", "Props", "Context", "Refs"],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "Which method is used to update state in a functional component?",
        options: ["setState", "updateState", "The second value returned by useState", "forceUpdate"],
        correctAnswer: 2
      },
      {
        id: 6,
        question: "What is potential problem with using index as a key?",
        options: ["It causes syntax errors", "It negatively affects performance and state issues with lists", "It is not supported in recent React versions", "It makes the code harder to read"],
        correctAnswer: 1
      },
      {
        id: 7,
        question: "What hook would you use to memorize a value?",
        options: ["useMemo", "useCallback", "useEffect", "useRef"],
        correctAnswer: 0
      },
      {
        id: 8,
        question: "What is the virtual DOM?",
        options: ["A direct copy of the browser DOM", "A lightweight copy of the DOM kept in memory", "A database representation", "A deprecated feature"],
        correctAnswer: 1
      },
      {
        id: 9,
        question: "How can you prevent a component from re-rendering if its props strictly equal the previous props?",
        options: ["React.memo", "useMemo", "shouldComponentUpdate", "PureComponent"],
        correctAnswer: 0
      },
      {
        id: 10,
        question: "What is the Context API used for?",
        options: ["Routing", "Managing global state without prop drilling", "Handling HTTP requests", "Animating components"],
        correctAnswer: 1
      },
      {
        id: 11,
        question: "Which hook is used to access a DOM element directly?",
        options: ["useState", "useEffect", "useRef", "useLayoutEffect"],
        correctAnswer: 2
      },
      {
        id: 12,
        question: "What is the rule of hooks?",
        options: ["Call them inside loops", "Call them inside conditions", "Call them at the top level of a component", "Call them in class components"],
        correctAnswer: 2
      },
      {
        id: 13,
        question: "What does useReducer replace in simple scenarios?",
        options: ["useEffect", "useState", "useContext", "useRef"],
        correctAnswer: 1
      },
      {
        id: 14,
        question: "How do you define a custom hook?",
        options: ["Start the function name with 'use'", "Start the function name with 'hook'", "Extend the React.Hook class", "It is not possible"],
        correctAnswer: 0
      },
      {
        id: 15,
        question: "What is prop drilling?",
        options: ["Passing data through many layers of components", "Validating props types", "Updating props directly", "Using default props"],
        correctAnswer: 0
      }
    ]
  },
  python: {
    id: "python",
    title: "Python for Data Science",
    description: "Challenge yourself with Python data structures, libraries, and syntax.",
    totalQuestions: 15,
    duration: 600,
    passPercentage: 65,
    questions: [
      {
        id: 1,
        question: "Which library is primarily used for data manipulation in Python?",
        options: ["NumPy", "Pandas", "Matplotlib", "Seaborn"],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What is the output of print(2 ** 3)?",
        options: ["6", "8", "9", "5"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Which keyword is used to define a function in Python?",
        options: ["func", "def", "function", "lambda"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What data type is the object [1, 2, 3]?",
        options: ["Tuple", "List", "Dictionary", "Set"],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "Which library is best for creating static, animated, and interactive visualizations?",
        options: ["Matplotlib", "Pandas", "Requests", "Flask"],
        correctAnswer: 0
      },
      {
        id: 6,
        question: "How do you install a package using the Python package manager?",
        options: ["python install package", "pip install package", "npm install package", "install package"],
        correctAnswer: 1
      },
      {
        id: 7,
        question: "What is a lambda function?",
        options: ["A named function", "A recursive function", "An anonymous function", "A loop"],
        correctAnswer: 2
      },
      {
        id: 8,
        question: "Which method adds an element to the end of a list?",
        options: ["push()", "add()", "append()", "insert()"],
        correctAnswer: 2
      },
      {
        id: 9,
        question: "What does the 'len()' function do?",
        options: ["Returns the length of an object", "Returns the last element", "Sorts the list", "Counts occurrences"],
        correctAnswer: 0
      },
      {
        id: 10,
        question: "Which data structure stores unique elements?",
        options: ["List", "Tuple", "Set", "Dictionary"],
        correctAnswer: 2
      },
      {
        id: 11,
        question: "How do you start a comment in Python?",
        options: ["//", "#", "/*", "<!--"],
        correctAnswer: 1
      },
      {
        id: 12,
        question: "Which operator is used for floor division?",
        options: ["/", "//", "%", "^"],
        correctAnswer: 1
      },
      {
        id: 13,
        question: "What is a DataFrame?",
        options: ["A 1D array", "A 2D labeled data structure", "A 3D matrix", "A visualization tool"],
        correctAnswer: 1
      },
      {
        id: 14,
        question: "Which method reads a CSV file in Pandas?",
        options: ["read_csv()", "load_csv()", "import_csv()", "open_csv()"],
        correctAnswer: 0
      },
      {
        id: 15,
        question: "What is the correct file extension for Python files?",
        options: [".python", ".py", ".pt", ".yt"],
        correctAnswer: 1
      }
    ]
  },
  node: {
    id: "node",
    title: "Node.js Backend",
    description: "Assess your expertise in building scalable backends with Node.js.",
    totalQuestions: 15,
    duration: 600,
    passPercentage: 70,
    questions: [
      {
        id: 1,
        question: "What is Node.js?",
        options: ["A frontend framework", "A JavaScript runtime built on Chrome's V8 engine", "A database", "A text editor"],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "Which module is used to create a web server in Node.js?",
        options: ["fs", "http", "path", "os"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "How do you import a module in CommonJS?",
        options: ["import module from 'module'", "require('module')", "include 'module'", "fetch('module')"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What is npm?",
        options: ["Node Package Manager", "Node Project Maker", "New Program Module", "Node Process Manager"],
        correctAnswer: 0
      },
      {
        id: 5,
        question: "Which event loop phase processes setImmediate()?",
        options: ["Timers", "Poll", "Check", "Close callbacks"],
        correctAnswer: 2
      },
      {
        id: 6,
        question: "What is Express.js?",
        options: ["A database", "A web application framework for Node.js", "A testing library", "A build tool"],
        correctAnswer: 1
      },
      {
        id: 7,
        question: "How do you handle asynchronous code in Node.js?",
        options: ["Callback functions", "Promises", "Async/Await", "All of the above"],
        correctAnswer: 3
      },
      {
        id: 8,
        question: "Which global object provides information about the current process?",
        options: ["window", "document", "process", "global"],
        correctAnswer: 2
      },
      {
        id: 9,
        question: "What is the purpose of package.json?",
        options: ["To store code", "To manage project metadata and dependencies", "To configure the database", "To style the application"],
        correctAnswer: 1
      },
      {
        id: 10,
        question: "Which module checks if a file exists?",
        options: ["fs", "http", "url", "path"],
        correctAnswer: 0
      },
      {
        id: 11,
        question: "What is Middleware in Express?",
        options: ["Software that bridges OS and Database", "Functions that execute during the request-response cycle", "A type of hardware", "A database query"],
        correctAnswer: 1
      },
      {
        id: 12,
        question: "How do you install a dependency as a dev dependency?",
        options: ["npm install --save", "npm install --dev", "npm install -D", "npm install --production"],
        correctAnswer: 2
      },
      {
        id: 13,
        question: "What does REPL stand for?",
        options: ["Read Eval Print Loop", "Run Execute Process Loop", "Read Edit Print Loop", "Run Eval Process Loop"],
        correctAnswer: 0
      },
      {
        id: 14,
        question: "Which is not a built-in Node.js module?",
        options: ["fs", "http", "react", "crypto"],
        correctAnswer: 2
      },
      {
        id: 15,
        question: "What is the default scope of a variable in a Node.js module?",
        options: ["Global", "Local to the module", "Local to the function", "Universal"],
        correctAnswer: 1
      }
    ]
  },
  javascript: {
    id: "javascript",
    title: "JavaScript Fundamentals",
    description: "Test your core JavaScript skills including ES6+ features.",
    totalQuestions: 15,
    duration: 600,
    passPercentage: 75,
    questions: [
      {
        id: 1,
        question: "Which variable declaration is block-scoped?",
        options: ["var", "let", "const", "Both let and const"],
        correctAnswer: 3
      },
      {
        id: 2,
        question: "What is the output of '2' + 2?",
        options: ["4", "22", "NaN", "Error"],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "Which method removes the last element from an array?",
        options: ["shift()", "pop()", "push()", "slice()"],
        correctAnswer: 1
      },
      {
        id: 4,
        question: "What is a closure?",
        options: ["A function bundled with its lexical environment", "A method to close a window", "A database connection", "A loop termination"],
        correctAnswer: 0
      },
      {
        id: 5,
        question: "Which symbol is used for template literals?",
        options: ["'", "\"", "`", "-"],
        correctAnswer: 2
      },
      {
        id: 6,
        question: "What does 'this' refer to in an arrow function?",
        options: ["The function itself", "The global object", "The enclosing lexical context", "Undefined"],
        correctAnswer: 2
      },
      {
        id: 7,
        question: "How do you convert a JSON string to a JavaScript object?",
        options: ["JSON.stringify()", "JSON.parse()", "JSON.object()", "JSON.convert()"],
        correctAnswer: 1
      },
      {
        id: 8,
        question: "What is the purpose of the 'map' method?",
        options: ["To modify the array in place", "To create a new array by calling a function on every element", "To filter elements", "To sort elements"],
        correctAnswer: 1
      },
      {
        id: 9,
        question: "Which operator checks for both value and type?",
        options: ["==", "===", "=", "!="],
        correctAnswer: 1
      },
      {
        id: 10,
        question: "What is hoisting?",
        options: ["Moving declarations to the top", "Lifting weights", "Moving state up", "Increasing priority"],
        correctAnswer: 0
      },
      {
        id: 11,
        question: "Which event occurs when a user clicks an HTML element?",
        options: ["onchange", "onmouseover", "onclick", "onmouseclick"],
        correctAnswer: 2
      },
      {
        id: 12,
        question: "What is a Promise?",
        options: ["A guarantee to return a value eventually", "A function call", "A variable type", "A loop"],
        correctAnswer: 0
      },
      {
        id: 13,
        question: "What keyword handles errors in JavaScript?",
        options: ["catch", "error", "try...catch", "stop"],
        correctAnswer: 2
      },
      {
        id: 14,
        question: "Which method combines two or more arrays?",
        options: ["concat()", "join()", "merge()", "append()"],
        correctAnswer: 0
      },
      {
        id: 15,
        question: "What is the result of typeof null?",
        options: ["'null'", "'undefined'", "'object'", "'number'"],
        correctAnswer: 2
      }
    ]
  }
};
