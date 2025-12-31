import React, { useState, useEffect } from "react";
import { jobApi } from "../../api/jobApi";
import { useNavigate, useParams } from "react-router-dom";

const EmployerEditJobPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    companyName: "",
    title: "",
    description: "",
    responsibilities: "",    // ✅ NEW
    qualifications: "",
    experienceRequired: "",
    location: "",
    jobType: "full-time",
    category: "Technology",
    role: "Backend Developer",
    salaryMin: "",
    salaryMax: "",
    companyWebsite: "",
    careerPageLink: "",
  });

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await jobApi.getJobById(id);
      const job = res.job || res.data?.job;

      setFormData({
        companyName: job.companyName || "",
        title: job.title || "",
        description: job.description || "",
        responsibilities: job.responsibilities || "",    // ✅ NEW
        qualifications: job.qualifications || "",
        experienceRequired: job.experienceRequired || "",
        location: job.location || "",
        jobType: job.jobType || "full-time",
        category: job.category || "Technology",
        role: job.role || "Backend Developer",
        salaryMin: job.salaryRange?.min || "",
        salaryMax: job.salaryRange?.max || "",
        companyWebsite: job.companyWebsite || "",
        careerPageLink: job.careerPageLink || "",
      });
    } catch (error) {
      console.error("Error fetching job:", error);
      alert("Failed to load job details");
      navigate("/employer/jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description,
      responsibilities: formData.responsibilities,    // ✅ NEW
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
      await jobApi.updateJob(id, payload);
      alert("Job updated successfully! ✅");
      navigate("/employer/jobs");
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to update job");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-2 text-center">Edit Job Posting</h1>
        <p className="text-gray-600 text-center mb-8">
          Update your job posting details
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
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
                <option value="Design">Design</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education">Education</option>
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
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Mobile Developer">Mobile Developer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Data Scientist">Data Scientist</option>
                <option value="Data Engineer">Data Engineer</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
                <option value="Systems Analyst">Systems Analyst</option>
              </select>
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

          {/* ✅ NEW: Responsibilities */}
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

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate("/employer/jobs")}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
            >
              ✅ Update Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployerEditJobPage;