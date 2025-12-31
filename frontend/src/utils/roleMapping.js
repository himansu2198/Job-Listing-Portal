// frontend/src/utils/roleMapping.js

export const ROLE_OPTIONS = {
  Technology: [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Mobile Developer",
    "Data Analyst",
    "Data Scientist",
    "Data Engineer",
    "DevOps Engineer",
    "Cybersecurity Analyst",
    "Systems Analyst",
  ],
  
  Marketing: [
    "Digital Marketing Manager",
    "Social Media Manager",
    "Content Writer",
    "SEO Specialist",
    "Marketing Analyst",
    "Brand Manager",
    "Product Marketing Manager",
  ],
  
  Design: [
    "UI/UX Designer",
    "Graphic Designer",
    "Web Designer",
    "Product Designer",
    "Motion Graphics Designer",
  ],
  
  Finance: [
    "Financial Analyst",
    "Accountant",
    "Investment Banker",
    "Financial Advisor",
    "Auditor",
    "Tax Consultant",
  ],
  
  Healthcare: [
    "Registered Nurse",
    "Medical Doctor",
    "Pharmacist",
    "Healthcare Administrator",
    "Medical Lab Technician",
  ],
  
  Education: [
    "Teacher",
    "Professor",
    "Academic Coordinator",
    "Curriculum Developer",
    "Education Consultant",
    "School Administrator",
  ],
};

export const CATEGORIES = [
  "Technology",
  "Marketing",
  "Design",
  "Finance",
  "Healthcare",
  "Education",
];

export const getRolesForCategory = (category) => {
  return ROLE_OPTIONS[category] || [];
};