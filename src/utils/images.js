// Image utility - Maps course categories and names to image paths
// Users can add their own images to public/images/ directory

export const getCourseImage = (courseId, category, title) => {
  // 1. First check if we have an explicit mapping for this ID
  const courseImageMap = {
    1: "/images/courses/react.png",
    2: "/images/courses/python.png",
    3: "/images/courses/uiux.png", // Fixed from design.png to match specific image
    4: "/images/courses/business.png",
    5: "/images/courses/flutter.png",
    6: "/images/courses/javascript.png",
    7: "/images/courses/nodejs.png",
    8: "/images/courses/vuejs.png",
    9: "/images/courses/angular.png",
    10: "/images/courses/machine-learning.png",
    11: "/images/courses/deep-learning.png",
    12: "/images/courses/pandas.png",
    13: "/images/courses/hadoop.png", // Note: Image might not exist, will fall back
    14: "/images/courses/tableau.png", // Note: Image might not exist, will fall back
    15: "/images/courses/aws.png", // Note: Image might not exist, will fall back
    16: "/images/courses/docker.png", // Note: Image might not exist, will fall back
    17: "/images/courses/azure.png", // Note: Image might not exist, will fall back
    18: "/images/courses/ethical-hacking.png",
    19: "/images/courses/cybersecurity.png",
    20: "/images/courses/ios.png",
    21: "/images/courses/android.png", // Note: Image might not exist, will fall back
    22: "/images/courses/react-native.png", // Note: Image might not exist, will fall back
    23: "/images/courses/figma.png",
    24: "/images/courses/adobe-xd.png",
    25: "/images/courses/marketing.png", // Note: Image might not exist, will fall back
    26: "/images/courses/pmp.png", // Note: Image might not exist, will fall back
    27: "/images/courses/upsc.png", // Note: Image might not exist, will fall back
    28: "/images/courses/ssc.png", // Note: Image might not exist, will fall back
    29: "/images/courses/banking.png", // Note: Image might not exist, will fall back
    30: "/images/courses/railway.png", // Note: Image might not exist, will fall back
    31: "/images/courses/defense.png", // Note: Image might not exist, will fall back
    32: "/images/courses/teaching.png", // Note: Image might not exist, will fall back
    33: "/images/courses/blockchain.png", // Note: Image might not exist, will fall back
    34: "/images/courses/graphql.png", // Note: Image might not exist, will fall back
    35: "/images/courses/typescript.png",
  };

  if (courseImageMap[courseId]) {
    return courseImageMap[courseId];
  }

  // 2. Try to match by title (case-insensitive partial match)
  if (title) {
    const lowerTitle = title.toLowerCase();

    const titleImageMap = [
      { keywords: ["react", "native"], image: "/images/courses/react.png" }, // Priority logic
      { keywords: ["react"], image: "/images/courses/react.png" },
      { keywords: ["python"], image: "/images/courses/python.png" },
      {
        keywords: ["machine", "learning"],
        image: "/images/courses/machine-learning.png",
      },
      {
        keywords: ["deep", "learning"],
        image: "/images/courses/deep-learning.png",
      },
      { keywords: ["node", "js"], image: "/images/courses/nodejs.png" },
      {
        keywords: ["javascript", "js"],
        image: "/images/courses/javascript.png",
      },
      { keywords: ["type", "script"], image: "/images/courses/typescript.png" },
      { keywords: ["angular"], image: "/images/courses/angular.png" },
      { keywords: ["vue"], image: "/images/courses/vuejs.png" },
      { keywords: ["design", "ui", "ux"], image: "/images/courses/uiux.png" },
      { keywords: ["figma"], image: "/images/courses/figma.png" },
      { keywords: ["adobe", "xd"], image: "/images/courses/adobe-xd.png" },
      { keywords: ["flutter"], image: "/images/courses/flutter.png" },
      { keywords: ["ios", "swift"], image: "/images/courses/ios.png" },
      {
        keywords: ["cyber", "security"],
        image: "/images/courses/cybersecurity.png",
      },
      {
        keywords: ["ethical", "hacking"],
        image: "/images/courses/ethical-hacking.png",
      },
      {
        keywords: ["pandas", "data", "analysis"],
        image: "/images/courses/pandas.png",
      },
      { keywords: ["business"], image: "/images/courses/business.png" },
    ];

    for (const mapping of titleImageMap) {
      if (mapping.keywords.some((keyword) => lowerTitle.includes(keyword))) {
        return mapping.image;
      }
    }
  }

  // 3. Fallback to category-based images
  const categoryImageMap = {
    web: "/images/courses/react.png", // Fallback for web
    data: "/images/courses/python.png", // Fallback for data
    design: "/images/courses/design.png",
    business: "/images/courses/business.png",
    mobile: "/images/courses/flutter.png", // Fallback for mobile
    cloud: "/images/courses/docker.png", // We don't have a generic cloud image, using docker if available or fallback
    cyber: "/images/courses/cybersecurity.png",
    ai: "/images/courses/machine-learning.png",
    gov: "/images/courses/upsc.png", // Assuming we might have this
  };

  if (category && categoryImageMap[category]) {
    return categoryImageMap[category];
  }

  // 4. Ultimate Fallback to absolute placeholder
  // Use placeholder service as final fallback
  const placeholderService = "https://images.unsplash.com/photo-";
  const placeholderMap = {
    web: "1498050108023-52492575b24b",
    data: "1551288049-bebda4e38f71",
    design: "1561070791-83c3fe3c11f3",
    business: "1552664730-d307ca884978",
    mobile: "1512941937669-90a1b58e6e9c",
    cloud: "1558494949-ef010e3c1f69",
    cyber: "1550751827-4bd9c8c6ce88",
    ai: "1485827404703-0b27fdca5346",
    gov: "1507003211169-0a1dd7228f2d",
  };

  return `${placeholderService}${placeholderMap[category] || "1498050108023-52492575b24b"}?w=400&h=300&fit=crop&auto=format`;
};

export const getCompanyImage = (companyName) => {
  const companyImageMap = {
    Google: "/images/companies/google.png",
    Microsoft: "/images/companies/microsoft.png",
    Amazon: "/images/companies/amazon.png",
    Apple: "/images/companies/apple.png",
    Meta: "/images/companies/meta.png",
    Netflix: "/images/companies/netflix.png",
    Tesla: "/images/companies/tesla.png",
    Adobe: "/images/companies/adobe.png",
    Salesforce: "/images/companies/salesforce.png",
    IBM: "/images/companies/ibm.png",
    Oracle: "/images/companies/oracle.png",
    Cisco: "/images/companies/cisco.png",
    Intel: "/images/companies/intel.png",
    NVIDIA: "/images/companies/nvidia.png",
    Qualcomm: "/images/companies/qualcomm.png",
    PayPal: "/images/companies/paypal.png",
    Uber: "/images/companies/uber.png",
    Airbnb: "/images/companies/airbnb.png",
    Spotify: "/images/companies/spotify.png",
    Zoom: "/images/companies/zoom.png",
    Slack: "/images/companies/slack.png",
    Dropbox: "/images/companies/dropbox.png",
    Stripe: "/images/companies/stripe.png",
    Shopify: "/images/companies/shopify.png",
    Atlassian: "/images/companies/atlassian.png",
    MongoDB: "/images/companies/mongodb.png",
    GitHub: "/images/companies/github.png",
    Docker: "/images/companies/docker.png",
    Kubernetes: "/images/companies/kubernetes.png",
    AWS: "/images/companies/aws.png",
    Azure: "/images/companies/azure.png",
    GCP: "/images/companies/gcp.png",
  };

  // Fallback to placeholder
  return companyImageMap[companyName] || "/images/companies/default.png";
};

export const getInstructorAvatar = (instructorName) => {
  // Use placeholder avatars
  const avatarMap = {
    "Jhon Doe":
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format",
    "Jane Smith":
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format",
    "Sarah Johnson":
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format",
  };

  return (
    avatarMap[instructorName] ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(instructorName)}&size=200&background=0c88ff&color=fff&bold=true`
  );
};
