// Image utility - Maps course categories and names to image paths
// Users can add their own images to public/images/ directory

export const getCourseImage = (courseId, category, title) => {
  // Map course IDs to specific images
  const courseImageMap = {
    1: '/images/courses/react.png',
    2: '/images/courses/python.png',
    3: '/images/courses/design.png',
    4: '/images/courses/business.png',
    5: '/images/courses/flutter.png',
    6: '/images/courses/javascript.png',
    7: '/images/courses/nodejs.png',
    8: '/images/courses/vuejs.png',
    9: '/images/courses/angular.png',
    10: '/images/courses/machine-learning.png',
    11: '/images/courses/deep-learning.png',
    12: '/images/courses/pandas.png',
    13: '/images/courses/hadoop.png',
    14: '/images/courses/tableau.png',
    15: '/images/courses/aws.png',
    16: '/images/courses/docker.png',
    17: '/images/courses/azure.png',
    18: '/images/courses/ethical-hacking.png',
    19: '/images/courses/cybersecurity.png',
    20: '/images/courses/ios.png',
    21: '/images/courses/android.png',
    22: '/images/courses/react-native.png',
    23: '/images/courses/figma.png',
    24: '/images/courses/adobe-xd.png',
    25: '/images/courses/marketing.png',
    26: '/images/courses/pmp.png',
    27: '/images/courses/upsc.png',
    28: '/images/courses/ssc.png',
    29: '/images/courses/banking.png',
    30: '/images/courses/railway.png',
    31: '/images/courses/defense.png',
    32: '/images/courses/teaching.png',
    33: '/images/courses/blockchain.png',
    34: '/images/courses/graphql.png',
    35: '/images/courses/typescript.png',
  }

  // Fallback to category-based images
  const categoryImageMap = {
    web: '/images/categories/web-development.png',
    data: '/images/categories/data-science.png',
    design: '/images/categories/design.png',
    business: '/images/categories/business.png',
    mobile: '/images/categories/mobile-development.png',
    cloud: '/images/categories/cloud.png',
    cyber: '/images/categories/cybersecurity.png',
    ai: '/images/categories/ai-ml.png',
    gov: '/images/categories/government.png',
  }

  // Use placeholder service as fallback
  const placeholderService = 'https://images.unsplash.com/photo-'
  const placeholderMap = {
    web: '1498050108023-52492575b24b',
    data: '1551288049-bebda4e38f71',
    design: '1561070791-83c3fe3c11f3',
    business: '1552664730-d307ca884978',
    mobile: '1512941937669-90a1b58e6e9c',
    cloud: '1558494949-ef010e3c1f69',
    cyber: '1550751827-4bd9c8c6ce88',
    ai: '1485827404703-0b27fdca5346',
    gov: '1507003211169-0a1dd7228f2d',
  }

  return courseImageMap[courseId] || 
         categoryImageMap[category] || 
         `${placeholderService}${placeholderMap[category] || '1498050108023-52492575b24b'}?w=400&h=300&fit=crop&auto=format`
}

export const getCompanyImage = (companyName) => {
  const companyImageMap = {
    'Google': '/images/companies/google.png',
    'Microsoft': '/images/companies/microsoft.png',
    'Amazon': '/images/companies/amazon.png',
    'Apple': '/images/companies/apple.png',
    'Meta': '/images/companies/meta.png',
    'Netflix': '/images/companies/netflix.png',
    'Tesla': '/images/companies/tesla.png',
    'Adobe': '/images/companies/adobe.png',
    'Salesforce': '/images/companies/salesforce.png',
    'IBM': '/images/companies/ibm.png',
    'Oracle': '/images/companies/oracle.png',
    'Cisco': '/images/companies/cisco.png',
    'Intel': '/images/companies/intel.png',
    'NVIDIA': '/images/companies/nvidia.png',
    'Qualcomm': '/images/companies/qualcomm.png',
    'PayPal': '/images/companies/paypal.png',
    'Uber': '/images/companies/uber.png',
    'Airbnb': '/images/companies/airbnb.png',
    'Spotify': '/images/companies/spotify.png',
    'Zoom': '/images/companies/zoom.png',
    'Slack': '/images/companies/slack.png',
    'Dropbox': '/images/companies/dropbox.png',
    'Stripe': '/images/companies/stripe.png',
    'Shopify': '/images/companies/shopify.png',
    'Atlassian': '/images/companies/atlassian.png',
    'MongoDB': '/images/companies/mongodb.png',
    'GitHub': '/images/companies/github.png',
    'Docker': '/images/companies/docker.png',
    'Kubernetes': '/images/companies/kubernetes.png',
    'AWS': '/images/companies/aws.png',
    'Azure': '/images/companies/azure.png',
    'GCP': '/images/companies/gcp.png',
  }

  // Fallback to placeholder
  return companyImageMap[companyName] || '/images/companies/default.png'
}

export const getInstructorAvatar = (instructorName) => {
  // Use placeholder avatars
  const avatarMap = {
    'John Doe': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format',
    'Jane Smith': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&auto=format',
    'Sarah Johnson': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&auto=format',
  }
  
  return avatarMap[instructorName] || `https://ui-avatars.com/api/?name=${encodeURIComponent(instructorName)}&size=200&background=0c88ff&color=fff&bold=true`
}

