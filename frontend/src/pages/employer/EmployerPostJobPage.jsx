import React, { useState, useEffect } from "react";
import { jobApi } from "../../api/jobApi";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, getRolesForCategory } from "../../utils/roleMapping";

const EmployerPostJobPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    title: "",
    description: "",
    responsibilities: "",
    qualifications: "",
    experienceRequired: "",
    location: "",
    jobType: "full-time",
    category: "Technology",
    role: "",
    salaryMin: "",
    salaryMax: "",
    companyWebsite: "",
    careerPageLink: "",
  });

  const [availableRoles, setAvailableRoles] = useState([]);

  // Initialize roles on mount and when category changes
  useEffect(() => {
    const roles = getRolesForCategory(formData.category);
    setAvailableRoles(roles);
    // Auto-select first role when category changes
    if (roles.length > 0 && !roles.includes(formData.role)) {
      setFormData((prev) => ({ ...prev, role: roles[0] }));
    }
  }, [formData.category]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      responsibilities: formData.responsibilities,
      qualifications: formData.qualifications,
      experienceRequired: formData.experienceRequired,
      location: formData.location,
      jobType: formData.jobType,
      category: formData.category,
      role: formData.role,
      companyName: formData.companyName,
      companyWebsite: formData.companyWebsite || undefined,
      careerPageLink: formData.careerPageLink || undefined,
    };

    if (formData.salaryMin && formData.salaryMax) {
      payload.salaryRange = {
        min: Number(formData.salaryMin),
        max: Number(formData.salaryMax),
      };
    }

    try {
      await jobApi.createJob(payload);
      alert("Job posted successfully 🚀");
      navigate("/employer/jobs");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to post job");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-2 text-center">Post a New Job</h1>
        <p className="text-gray-600 text-center mb-8">
          Fill in the details to create a new job posting
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              name="companyName"
              placeholder="e.g., Acme Corporation"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Senior Backend Developer"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Category & Role */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {availableRoles.length === 0 ? (
                  <option value="">Select a category first</option>
                ) : (
                  availableRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))
                )}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                Roles change based on selected category
              </p>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              name="description"
              placeholder="Describe the role and what you're looking for..."
              rows={4}
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Responsibilities *
            </label>
            <textarea
              name="responsibilities"
              placeholder="List key responsibilities (e.g., Design and develop APIs, Lead team meetings, etc.)"
              rows={4}
              value={formData.responsibilities}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Qualifications */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qualifications *
            </label>
            <textarea
              name="qualifications"
              placeholder="List required qualifications (e.g., Bachelor's in CS, 3+ years experience with Node.js, etc.)"
              rows={4}
              value={formData.qualifications}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Location, Job Type, Experience */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g., New York, NY"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type *
              </label>
              <select
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="internship">Internship</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>
              <input
                type="text"
                name="experienceRequired"
                placeholder="e.g., 3-5 years"
                value={formData.experienceRequired}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salary Range (Optional)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="salaryMin"
                placeholder="Min (e.g., 80000)"
                value={formData.salaryMin}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="number"
                name="salaryMax"
                placeholder="Max (e.g., 120000)"
                value={formData.salaryMax}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Company Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Website
              </label>
              <input
                type="url"
                name="companyWebsite"
                placeholder="https://company.com"
                value={formData.companyWebsite}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Career Page Link
              </label>
              <input
                type="url"
                name="careerPageLink"
                placeholder="https://company.com/careers"
                value={formData.careerPageLink}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            🚀 Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployerPostJobPage;





