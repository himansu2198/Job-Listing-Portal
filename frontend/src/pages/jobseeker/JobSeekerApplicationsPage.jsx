import React, { useEffect, useState } from "react";
import { Search, Filter, Calendar, Clock, CheckCircle, XCircle, FileText } from "lucide-react";
import { applicationApi } from "../../api/applicationApi";

const JobSeekerApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await applicationApi.getMyApplications();
        const data = res.applications || res.data.applications;
        setApplications(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter;
  });

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === "applied").length,
    interview: applications.filter(a => a.status === "shortlisted").length,
    rejected: applications.filter(a => a.status === "rejected").length,
    hired: applications.filter(a => a.status === "hired").length,
  };

  const getStatusBadge = (status) => {
    const styles = {
      applied: "bg-yellow-100 text-yellow-800",
      shortlisted: "bg-blue-100 text-blue-800",
      rejected: "bg-red-100 text-red-800",
      hired: "bg-green-100 text-green-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-6">My Applications</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="card text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-yellow-600">{stats.applied}</p>
            <p className="text-sm text-gray-600">Applied</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.interview}</p>
            <p className="text-sm text-gray-600">Shortlisted</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-green-600">{stats.hired}</p>
            <p className="text-sm text-gray-600">Hired</p>
          </div>
          <div className="card text-center">
            <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
            <p className="text-sm text-gray-600">Rejected</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-6 flex flex-wrap gap-2">
          {["all", "applied", "shortlisted", "hired", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded text-sm ${
                filter === status
                  ? "bg-primary-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Applications Table */}
        <div className="card overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 text-left">Job</th>
                <th className="py-3 px-4 text-left">Applied On</th>
                <th className="py-3 px-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app) => (
                <tr key={app._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="font-medium">{app.job.title}</div>
                    <div className="text-sm text-gray-500">
                      {app.job.companyName}
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm">
                    {new Date(app.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getStatusBadge(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredApplications.length === 0 && (
            <div className="text-center py-10 text-gray-500">
              No applications found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerApplicationsPage;
