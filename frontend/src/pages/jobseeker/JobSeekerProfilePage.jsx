// frontend/src/pages/jobseeker/JobSeekerProfilePage.jsx
import React, { useEffect, useState } from "react";
import { profileApi } from "../../api/profileApi";
import { Upload, Check, AlertCircle, Save, User, Mail, Phone, MapPin, Briefcase } from "lucide-react";

const JobSeekerProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    location: "",
    professionalTitle: "",
    professionalSummary: "",
    skills: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await profileApi.getProfile();
      setProfile(data.profile);
      setFormData({
        username: data.profile.username || "",
        phone: data.profile.phone || "",
        location: data.profile.location || "",
        professionalTitle: data.profile.professionalTitle || "",
        professionalSummary: data.profile.professionalSummary || "",
        skills: data.profile.skills?.join(", ") || "",
      });
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSaving(true);
    try {
      await profileApi.updateProfile(formData);
      await fetchProfile();
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    setUploadingResume(true);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      
      await profileApi.uploadResume(formData);
      await fetchProfile();
      alert("Resume uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload resume:", error);
      alert("Failed to upload resume");
    } finally {
      setUploadingResume(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const completionPercentage = profile
    ? Math.round(
        ((profile.username ? 1 : 0) +
          (profile.phone ? 1 : 0) +
          (profile.location ? 1 : 0) +
          (profile.professionalTitle ? 1 : 0) +
          (profile.professionalSummary ? 1 : 0) +
          (profile.skills?.length > 0 ? 1 : 0) +
          (profile.resume ? 1 : 0)) /
          7 *
          100
      )
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-600 mt-1">
            Manage your personal information and resume
          </p>
        </div>

        {/* Profile Completion Alert */}
        {!profile?.profileCompleted && (
          <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-yellow-800">
                  Complete your profile to apply for jobs
                </h3>
                <p className="mt-1 text-sm text-yellow-700">
                  You need to complete all sections including uploading your resume before you can apply for jobs.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Form */}
          <div className="lg:col-span-2">
            {/* Profile Completion Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Profile Completion</h2>
                <span className="text-2xl font-bold text-blue-600">
                  {completionPercentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* Basic Information Card */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

              <div className="space-y-5">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Email (Read-only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profile?.email || ""}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                    disabled
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="New York, NY"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Professional Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="h-4 w-4 inline mr-2" />
                    Professional Title *
                  </label>
                  <input
                    type="text"
                    name="professionalTitle"
                    value={formData.professionalTitle}
                    onChange={handleChange}
                    placeholder="Frontend Developer"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Professional Summary */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Summary *
                  </label>
                  <textarea
                    name="professionalSummary"
                    value={formData.professionalSummary}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your experience, skills, and what you're looking for..."
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills * (comma-separated)
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, JavaScript, TypeScript, Node.js"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Separate skills with commas (e.g., React, JavaScript, Node.js)
                  </p>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                disabled={saving}
                className={`mt-6 w-full py-3 rounded-lg font-semibold transition-all inline-flex items-center justify-center ${
                  saving
                    ? "bg-gray-300 cursor-not-allowed text-gray-600"
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                }`}
              >
                <Save className="h-5 w-5 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Right Column - Resume & Info */}
          <div className="lg:col-span-1">
            {/* Resume Upload Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Resume</h2>

              {profile?.resume ? (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Resume uploaded
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Your resume is ready for job applications
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-800">
                        Resume required
                      </p>
                      <p className="text-xs text-red-600 mt-1">
                        Upload your resume to apply for jobs
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-3" />
                <label className="cursor-pointer">
                  <span className="text-sm font-medium text-blue-600 hover:text-blue-700">
                    {profile?.resume ? "Replace Resume" : "Upload Resume"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleResumeUpload}
                    className="hidden"
                    disabled={uploadingResume}
                  />
                </label>
                <p className="text-xs text-gray-500 mt-2">PDF only, max 5MB</p>
                
                {uploadingResume && (
                  <p className="text-sm text-blue-600 mt-3">Uploading...</p>
                )}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Your resume will be automatically used when you apply for jobs. No need to upload it again for each application!
                </p>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600">
                  <strong>💡 Tip:</strong> A complete resume increases your chances of getting hired by 40%.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerProfilePage;