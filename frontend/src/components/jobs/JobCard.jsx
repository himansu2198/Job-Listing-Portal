import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Briefcase, DollarSign, Clock, Users } from "lucide-react";

const JobCard = ({ job }) => {
  const getJobTypeBadge = (type) => {
    const types = {
      "full-time": { label: "Full Time", class: "bg-green-100 text-green-800" },
      "part-time": { label: "Part Time", class: "bg-blue-100 text-blue-800" },
      "internship": { label: "Internship", class: "bg-yellow-100 text-yellow-800" },
    };
    return types[type] || { label: type, class: "bg-gray-100 text-gray-800" };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const diffDays = Math.floor(
      (new Date() - date) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  const badge = getJobTypeBadge(job.jobType);

  return (
    <div className="job-card p-6 border rounded-lg bg-white">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            {job.title}
          </h3>
          <p className="text-gray-600">{job.companyName}</p>

          {/* ✅ CATEGORY & ROLE ADDED */}
          <div className="flex flex-wrap gap-2 mt-2">
            {job.category && (
              <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded">
                {job.category}
              </span>
            )}

            {job.role && (
              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded">
                {job.role}
              </span>
            )}
          </div>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${badge.class}`}
        >
          {badge.label}
        </span>
      </div>

      <p className="text-gray-700 line-clamp-2 mb-4">
        {job.description}
      </p>

      <div className="space-y-2 mb-4 text-sm text-gray-600">
        <div className="flex items-center">
          <MapPin className="h-4 w-4 mr-2" />
          {job.location}
        </div>

        <div className="flex items-center">
          <Briefcase className="h-4 w-4 mr-2" />
          {job.jobType}
        </div>

        <div className="flex items-center">
          <DollarSign className="h-4 w-4 mr-2" />
          {job.salaryRange?.min} - {job.salaryRange?.max}
        </div>

        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          {formatDate(job.createdAt)}
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          {job.applicationsCount} applicants
        </div>

        <Link
          to={`/jobs/${job._id}`}
          className="text-primary-600 hover:text-primary-700 font-medium"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default JobCard;

