import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Users,
  Bell,
  Plus,
  Eye,
} from "lucide-react";
//import { io } from "socket.io-client";

import {jobApi} from "../../api/jobApi";
import { applicationApi } from "../../api/applicationApi";
import { notificationApi } from "../../api/notificationApi";
import { useAuth } from "../../context/AuthContext";

//const socket = io("https://job-listing-portal-dpov.onrender.com/");

const EmployerDashboard = () => {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH DASHBOARD DATA =================
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const jobsRes = await jobApi.getEmployerJobs();
        const appsRes = await applicationApi.getEmployerApplications();
        const notifRes = await notificationApi.getNotifications();

        setJobs(jobsRes.jobs || jobsRes.data.jobs);
        setApplications(appsRes.applications || appsRes.data.applications);
        setNotifications(notifRes.notifications || notifRes.data.notifications);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // ================= SOCKET.IO =================
  //useEffect(() => {
   // if (!user?.id) return;

    //socket.emit("join", user.id);

    //socket.on("notification", (data) => {
     // setNotifications((prev) => [
       // { message: data.message, isRead: false },
       // ...prev,
      //]);
    //});

   // return () => socket.off("notification");
  //}, [user?.id]);

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

        {/* ================= HEADER ================= */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Employer Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage jobs, applications & hiring
            </p>
          </div>

          <Link to="/employer/post-job" className="btn-primary flex gap-2">
            <Plus className="h-4 w-4" />
            Post Job
          </Link>
        </div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <Briefcase className="h-6 w-6 mx-auto text-blue-600" />
            <p className="text-2xl font-bold mt-2">{jobs.length}</p>
            <p className="text-sm text-gray-600">Total Jobs</p>
          </div>

          <div className="card text-center">
            <Users className="h-6 w-6 mx-auto text-green-600" />
            <p className="text-2xl font-bold mt-2">{applications.length}</p>
            <p className="text-sm text-gray-600">Total Applications</p>
          </div>

          <div className="card text-center">
            <Bell className="h-6 w-6 mx-auto text-purple-600" />
            <p className="text-2xl font-bold mt-2">
              {notifications.filter((n) => !n.isRead).length}
            </p>
            <p className="text-sm text-gray-600">Unread Notifications</p>
          </div>

          <div className="card text-center">
            <Eye className="h-6 w-6 mx-auto text-orange-600" />
            <p className="text-2xl font-bold mt-2">
              {jobs.reduce(
                (sum, job) => sum + (job.applicationsCount || 0),
                0
              )}
            </p>
            <p className="text-sm text-gray-600">Total Applicants</p>
          </div>
        </div>

        {/* ================= NOTIFICATIONS ================= */}
        <div className="card mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>

          {notifications.length === 0 ? (
            <p className="text-sm text-gray-500">
              No notifications yet
            </p>
          ) : (
            <div className="space-y-2">
              {notifications.slice(0, 5).map((n, i) => (
                <div
                  key={i}
                  className={`p-3 rounded border text-sm ${
                    n.isRead ? "bg-gray-50" : "bg-blue-50"
                  }`}
                >
                  {n.message}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= RECENT JOBS ================= */}
        <div className="card mb-8">
          <h2 className="text-lg font-semibold mb-4">Recent Job Postings</h2>

          {jobs.length === 0 ? (
            <p className="text-sm text-gray-500">
              No jobs posted yet
            </p>
          ) : (
            <div className="space-y-4">
              {jobs.slice(0, 5).map((job) => (
                <div
                  key={job._id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-medium">{job.title}</p>
                    <p className="text-sm text-gray-500">
                      {job.applicationsCount} applicants
                    </p>
                  </div>

                  <Link
                    to={`/employer/jobs/${job._id}/applications`}
                    className="text-primary-600 text-sm"
                  >
                    View Applications →
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ================= RECENT APPLICATIONS ================= */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">
            Recent Applications
          </h2>

          {applications.length === 0 ? (
            <p className="text-sm text-gray-500">
              No applications received yet
            </p>
          ) : (
            <div className="space-y-4">
              {applications.slice(0, 5).map((app) => (
                <div
                  key={app._id}
                  className="flex justify-between items-center border-b pb-3"
                >
                  <div>
                    <p className="font-medium">
                      {app.applicant.username}
                    </p>
                    <p className="text-sm text-gray-500">
                      Applied for {app.job.title}
                    </p>
                  </div>

                  <span className="text-xs px-3 py-1 rounded bg-gray-100">
                    {app.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default EmployerDashboard;
