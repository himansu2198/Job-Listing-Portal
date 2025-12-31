import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Mail, Calendar, CheckCircle, XCircle } from "lucide-react";
import { applicationApi } from "../../api/applicationApi";

const EmployerJobApplicationsPage = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, [jobId]);

  const fetchApplications = async () => {
    try {
      const res = await applicationApi.getEmployerApplications();
      const allApps = res.applications || res.data?.applications;

      const filtered = allApps.filter(
        (app) => app.job._id === jobId
      );

      setApplications(filtered);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShortlist = async (applicationId) => {
    if (!window.confirm("Are you sure you want to shortlist this candidate?")) {
      return;
    }

    setActionLoading(applicationId);
    try {
      await applicationApi.shortlistApplication(applicationId);
      
      // Update local state
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app._id === applicationId
            ? { ...app, status: "shortlisted" }
            : app
        )
      );

      alert("Candidate shortlisted successfully!");
    } catch (error) {
      console.error("Error shortlisting:", error);
      alert(error.response?.data?.message || "Failed to shortlist candidate");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (applicationId) => {
    if (!window.confirm("Are you sure you want to reject this candidate?")) {
      return;
    }

    setActionLoading(applicationId);
    try {
      await applicationApi.rejectApplication(applicationId);
      
      // Update local state
      setApplications((prevApps) =>
        prevApps.map((app) =>
          app._id === applicationId
            ? { ...app, status: "rejected" }
            : app
        )
      );

      alert("Candidate rejected");
    } catch (error) {
      console.error("Error rejecting:", error);
      alert(error.response?.data?.message || "Failed to reject candidate");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading applications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">
          Applications ({applications.length})
        </h1>

        <div className="space-y-6">
          {applications.map((app) => (
            <div key={app._id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-xl text-gray-900">
                    {app.applicant.username}
                  </h3>

                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      {app.applicant.email}
                    </span>

                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Applied on {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Additional applicant info if available */}
                  {app.applicant.phone && (
                    <p className="text-sm text-gray-600 mt-2">
                      📞 {app.applicant.phone}
                    </p>
                  )}
                  {app.applicant.location && (
                    <p className="text-sm text-gray-600 mt-1">
                      📍 {app.applicant.location}
                    </p>
                  )}
                  {app.applicant.professionalTitle && (
                    <p className="text-sm text-gray-600 mt-1">
                      💼 {app.applicant.professionalTitle}
                    </p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleShortlist(app._id)}
                    disabled={
                      actionLoading === app._id || 
                      app.status === "shortlisted" || 
                      app.status === "rejected"
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-2 ${
                      app.status === "shortlisted"
                        ? "bg-green-100 text-green-700 cursor-not-allowed"
                        : app.status === "rejected"
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : actionLoading === app._id
                        ? "bg-gray-200 text-gray-500 cursor-wait"
                        : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    }`}
                  >
                    <CheckCircle className="h-4 w-4" />
                    {app.status === "shortlisted" ? "Shortlisted" : "Shortlist"}
                  </button>

                  <button
                    onClick={() => handleReject(app._id)}
                    disabled={
                      actionLoading === app._id || 
                      app.status === "rejected" || 
                      app.status === "shortlisted"
                    }
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-2 ${
                      app.status === "rejected"
                        ? "bg-red-100 text-red-700 cursor-not-allowed"
                        : app.status === "shortlisted"
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : actionLoading === app._id
                        ? "bg-gray-200 text-gray-500 cursor-wait"
                        : "bg-red-100 text-red-700 hover:bg-red-200"
                    }`}
                  >
                    <XCircle className="h-4 w-4" />
                    {app.status === "rejected" ? "Rejected" : "Reject"}
                  </button>
                </div>
              </div>

              {/* Status Badge */}
              <div className="mt-4 pt-4 border-t">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    app.status === "shortlisted"
                      ? "bg-green-100 text-green-800"
                      : app.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  Status: {app.status}
                </span>

                {/* View Resume Link */}
                {app.resume && (
                  <a
                    href={`http://localhost:5000/${app.resume}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 text-sm text-blue-600 hover:underline"
                  >
                    📄 View Resume
                  </a>
                )}
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No applications yet for this job
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Applications will appear here once candidates apply
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerJobApplicationsPage;
