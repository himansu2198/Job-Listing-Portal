import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jobApi } from "../../api/jobApi";
import { applicationApi } from "../../api/applicationApi";
import { profileApi } from "../../api/profileApi";
import { useAuth } from "../../context/AuthContext";
import { AlertCircle, CheckCircle } from "lucide-react";

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isJobSeeker, user, isAuthenticated } = useAuth();

  const [job, setJob] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch job details
        const jobRes = await jobApi.getJobById(id);
        setJob(jobRes?.job || jobRes?.data?.job);

        // If user is a job seeker, fetch their profile
        if (isJobSeeker) {
          const profileRes = await profileApi.getProfile();
          setProfile(profileRes?.profile);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isJobSeeker]);

  const handleApply = async () => {
    // ✅ Check authentication
    if (!isAuthenticated) {
      alert("Please login to apply for this job");
      navigate("/login");
      return;
    }

    // ✅ Check role
    if (!isJobSeeker) {
      alert("Only job seekers can apply for jobs");
      return;
    }

    // ✅ Check if profile is complete
    if (!profile?.profileCompleted) {
      alert("Please complete your profile and upload your resume before applying");
      navigate("/jobseeker/profile");
      return;
    }

    // ✅ Check if resume is uploaded
    if (!profile?.resume) {
      alert("Please upload your resume in your profile before applying");
      navigate("/jobseeker/profile");
      return;
    }

    setApplying(true);

    try {
      // ✅ One-click apply - backend uses resume from profile
      await applicationApi.applyJob(id);
      
      setApplied(true);
      alert("Application submitted successfully!");
      
    } catch (error) {
      console.error("Application error:", error);
      
      // Handle specific errors
      if (error.response?.status === 401) {
        navigate("/login");
      } else if (error.response?.status === 400) {
        const message = error.response?.data?.message;
        if (message?.includes("profile") || message?.includes("resume")) {
          alert(message);
          navigate("/jobseeker/profile");
        }
      }
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading job details...</p>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-800">Job not found</h2>
        <button
          onClick={() => navigate("/jobs")}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Job Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
        <p className="text-xl text-gray-600 mt-2">{job.companyName}</p>
        <p className="mt-3 text-sm text-gray-500">
          👥 {job.applicationsCount || 0} people have applied
        </p>
      </div>

      {/* Job Description */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Job Description</h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {job.description}
        </p>
      </div>

      {/* Job Details */}
      {(job.location || job.salary || job.experienceRequired) && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Job Details</h2>
          <div className="space-y-3">
            {job.location && (
              <div className="flex items-start">
                <span className="text-gray-500 w-32">📍 Location:</span>
                <span className="text-gray-800 font-medium">{job.location}</span>
              </div>
            )}
            {job.salary && (
              <div className="flex items-start">
                <span className="text-gray-500 w-32">💰 Salary:</span>
                <span className="text-gray-800 font-medium">{job.salary}</span>
              </div>
            )}
            {job.experienceRequired && (
              <div className="flex items-start">
                <span className="text-gray-500 w-32">🎯 Experience:</span>
                <span className="text-gray-800 font-medium">{job.experienceRequired}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Company Links */}
      {(job.companyWebsite || job.careerPageLink) && (
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Company Links</h2>
          <div className="flex gap-4 flex-wrap">
            {job.companyWebsite && (
              <a
                href={job.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border-2 border-blue-200 rounded-lg text-blue-600 hover:bg-blue-50 transition inline-flex items-center gap-2 font-medium"
              >
                🌐 Company Website
              </a>
            )}
            {job.careerPageLink && (
              <a
                href={job.careerPageLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border-2 border-purple-200 rounded-lg text-purple-600 hover:bg-purple-50 transition inline-flex items-center gap-2 font-medium"
              >
                🚀 Career Page
              </a>
            )}
          </div>
        </div>
      )}

      {/* Apply Section - Only for Job Seekers */}
      {isJobSeeker && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Apply for this position</h2>
          
          {/* Profile Status */}
          {profile?.profileCompleted && profile?.resume ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800">
                    Your profile is complete and ready!
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Your resume will be automatically submitted when you click "Apply Now"
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Complete your profile to apply
                  </p>
                  <p className="text-sm text-yellow-700 mt-1">
                    {!profile?.resume 
                      ? "Please upload your resume in your profile"
                      : "Please complete all required profile fields"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Apply Button */}
          <button
            onClick={handleApply}
            disabled={applied || applying || !profile?.profileCompleted || !profile?.resume}
            className={`w-full px-6 py-3 rounded-lg font-semibold transition-all ${
              applied
                ? "bg-green-100 text-green-700 cursor-not-allowed"
                : applying
                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                : !profile?.profileCompleted || !profile?.resume
                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
            }`}
          >
            {applying 
              ? "Submitting..." 
              : applied 
              ? "✓ Application Submitted" 
              : !profile?.profileCompleted || !profile?.resume
              ? "Complete Profile to Apply"
              : "Apply Now"}
          </button>

          {/* Help text */}
          {(!profile?.profileCompleted || !profile?.resume) && !applied && (
            <p className="text-center text-sm text-gray-500 mt-3">
              <button
                onClick={() => navigate("/jobseeker/profile")}
                className="text-blue-600 hover:underline font-medium"
              >
                Go to Profile
              </button>
              {" "}to complete your information and upload your resume
            </p>
          )}
        </div>
      )}

      {/* Message for Employers */}
      {user && !isJobSeeker && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                You are logged in as an employer. Only job seekers can apply for jobs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Message for Guests */}
      {!isAuthenticated && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-6 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Please{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="font-semibold underline hover:text-blue-900"
                >
                  login
                </button>{" "}
                as a job seeker to apply for this job.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailPage;



