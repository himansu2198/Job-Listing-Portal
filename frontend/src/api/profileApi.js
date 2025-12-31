// frontend/src/api/profileApi.js
import axiosClient from "./axiosClient";

export const profileApi = {
  // Get current user profile
  getProfile: () => axiosClient.get("/profile"),

  // Update profile information
  updateProfile: (profileData) =>
    axiosClient.put("/profile", profileData),

  // Upload resume
  uploadResume: (formData) =>
    axiosClient.post("/profile/resume", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};