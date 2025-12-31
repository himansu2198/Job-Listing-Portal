import React from "react";

const blogs = [
  {
    title: "Top 10 Skills Employers Look for in 2025",
    author: "JobPortal Team",
    summary:
      "From problem-solving to cloud computing, here are the most in-demand skills employers want today.",
  },
  {
    title: "Remote Jobs: Pros, Cons and How to Get One",
    author: "Career Coach",
    summary:
      "Remote work is here to stay. Learn how to prepare yourself for remote job opportunities.",
  },
  {
    title: "How Internships Help You Land Full-Time Roles",
    author: "HR Expert",
    summary:
      "Internships provide hands-on experience and significantly increase your chances of getting hired.",
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Blog ✍️</h1>
        <p className="text-gray-600 text-center mb-10">
          Insights, trends and advice from industry experts.
        </p>

        <div className="space-y-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-2xl font-semibold mb-1">{blog.title}</h3>
              <p className="text-sm text-gray-500 mb-3">
                By {blog.author}
              </p>
              <p className="text-gray-600">{blog.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

