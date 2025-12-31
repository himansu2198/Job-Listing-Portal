import React from "react";

const tips = [
  {
    title: "How to Prepare for Technical Interviews",
    description:
      "Focus on core concepts, practice coding daily, and explain your thought process clearly during interviews.",
  },
  {
    title: "Building a Strong Resume as a Fresher",
    description:
      "Highlight projects, internships, and practical skills instead of just academic scores.",
  },
  {
    title: "How to Switch Careers Successfully",
    description:
      "Upskill with relevant technologies, build projects, and network with professionals in your target field.",
  },
];

const CareerTipsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Career Tips 🚀
        </h1>
        <p className="text-gray-600 text-center mb-10">
          Practical advice to help you grow and succeed in your career.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
              <p className="text-gray-600">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CareerTipsPage;

