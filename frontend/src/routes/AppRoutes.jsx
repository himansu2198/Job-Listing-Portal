import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Public pages
import HomePage from '../pages/public/HomePage';
import JobListPage from '../pages/public/JobListPage';
import JobDetailPage from '../pages/public/JobDetailPage';
import LoginPage from '../pages/public/LoginPage';
import RegisterPage from '../pages/public/RegisterPage';

// ✅ NEW PUBLIC PAGES (ADDED – NO LOGIC CHANGE)
import CareerTipsPage from '../pages/public/CareerTipsPage';
import BlogPage from '../pages/public/BlogPage';
import SuccessStoriesPage from '../pages/public/SuccessStoriesPage';

// Job seeker pages
import JobSeekerDashboard from '../pages/jobseeker/JobSeekerDashboard';
import JobSeekerProfilePage from '../pages/jobseeker/JobSeekerProfilePage';
import JobSeekerApplicationsPage from '../pages/jobseeker/JobSeekerApplicationsPage';

// Employer pages
import EmployerDashboard from '../pages/employer/EmployerDashboard';
import EmployerProfilePage from '../pages/employer/EmployerProfilePage';
import EmployerJobsPage from '../pages/employer/EmployerJobsPage';
import EmployerJobApplicationsPage from '../pages/employer/EmployerJobApplicationsPage';
import EmployerPostJobPage from '../pages/employer/EmployerPostJobPage';
import EmployerEditJobPage from '../pages/employer/EmployerEditJobPage';

// Components
import ProtectedRoute from '../components/common/ProtectedRoute';
import RoleBasedRoute from '../components/common/RoleBasedRoute';

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/jobs" element={<JobListPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* ✅ NEW PUBLIC ROUTES (FOOTER LINKS FIXED) */}
      <Route path="/career-tips" element={<CareerTipsPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/success-stories" element={<SuccessStoriesPage />} />

      {/* Job Seeker Routes */}
      <Route
        path="/jobseeker/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['jobseeker']}>
              <JobSeekerDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobseeker/profile"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['jobseeker']}>
              <JobSeekerProfilePage />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobseeker/applications"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['jobseeker']}>
              <JobSeekerApplicationsPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      {/* Employer Routes */}
      <Route
        path="/employer/dashboard"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['employer']}>
              <EmployerDashboard />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer/profile"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['employer']}>
              <EmployerProfilePage />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer/jobs"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['employer']}>
              <EmployerJobsPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer/jobs/:jobId/applications"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['employer']}>
              <EmployerJobApplicationsPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer/post-job"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['employer']}>
              <EmployerPostJobPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      <Route
        path="/employer/jobs/:id/edit"
        element={
          <ProtectedRoute>
            <RoleBasedRoute allowedRoles={['employer']}>
              <EmployerEditJobPage />
            </RoleBasedRoute>
          </ProtectedRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
