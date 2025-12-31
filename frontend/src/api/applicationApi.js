// frontend/src/api/applicationApi.js
import axiosClient from "./axiosClient";

export const applicationApi = {
  // ✅ One-click apply (no file upload - uses profile resume)
  applyJob: (jobId) =>
    axiosClient.post("/applications/apply", { jobId }),

  // Get job seeker's applications
  getMyApplications: () =>
    axiosClient.get("/applications/jobseeker"),

  // Get employer's applications
  getEmployerApplications: () =>
    axiosClient.get("/applications/employer"),

  // ✅ NEW: Shortlist application
  shortlistApplication: (applicationId) =>
    axiosClient.put(`/applications/${applicationId}/shortlist`),

  // ✅ NEW: Reject application
  rejectApplication: (applicationId) =>
    axiosClient.put(`/applications/${applicationId}/reject`),
};
