// frontend/src/api/jobApi.js
import axiosClient from "./axiosClient";

export const jobApi = {
  // Get all jobs (with optional filters)
  getJobs: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return axiosClient.get(`/jobs?${params}`);
  },

  // Get single job by ID
  getJobById: (id) => axiosClient.get(`/jobs/${id}`),

  // Get employer's jobs
  getEmployerJobs: () => axiosClient.get("/jobs/employer/jobs"),

  // Create new job
  createJob: (jobData) => axiosClient.post("/jobs", jobData),

  // ✅ NEW: Update existing job
  updateJob: (id, jobData) => axiosClient.put(`/jobs/${id}`, jobData),

  // Delete job
  deleteJob: (id) => axiosClient.delete(`/jobs/${id}`),
};


