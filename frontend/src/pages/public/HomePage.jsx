import React from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Briefcase,
  Users,
  Shield,
  MapPin,
  Building,
  CheckCircle,
  TrendingUp,
  DollarSign,
  Clock,
  Star,
  Zap,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import CountUp from 'react-countup';

const HomePage = () => {
  const { isAuthenticated, isJobSeeker, isEmployer } = useAuth();

  const features = [
    {
      icon: <Search className="h-6 w-6" />,
      title: 'Smart Search',
      description: 'Find jobs that match your skills with intelligent filters',
    },
    {
      icon: <Briefcase className="h-6 w-6" />,
      title: 'Top Companies',
      description: 'Connect with verified employers and industry leaders',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Career Support',
      description: 'Get expert advice and personalized career guidance',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Safe & Secure',
      description: 'Your data is protected with enterprise security',
    },
  ];

  const jobCategories = [
    { name: 'Technology', count: '1,234', icon: <Zap className="h-5 w-5" /> },
    { name: 'Marketing', count: '856', icon: <TrendingUp className="h-5 w-5" /> },
    { name: 'Design', count: '723', icon: <Star className="h-5 w-5" /> },
    { name: 'Finance', count: '645', icon: <DollarSign className="h-5 w-5" /> },
    { name: 'Healthcare', count: '432', icon: <Shield className="h-5 w-5" /> },
    { name: 'Education', count: '389', icon: <Users className="h-5 w-5" /> },
  ];

  // Updated stats array with numerical values and suffixes
  const stats = [
    { value: 10000, suffix: '+', label: 'Active Jobs', icon: <Briefcase className="h-8 w-8" /> },
    { value: 5000, suffix: '+', label: 'Companies', icon: <Building className="h-8 w-8" /> },
    { value: 50000, suffix: '+', label: 'Talents', icon: <Users className="h-8 w-8" /> },
    { value: 95, suffix: '%', label: 'Satisfaction', icon: <Star className="h-8 w-8" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Premium Hero Section with Full Animation */}
      <section className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 animate-gradient-slow" />
        
        {/* Dynamic Moving Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/30 via-blue-400/30 to-purple-400/30 animate-gradient-medium" />
        
        {/* Subtle Moving Particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 20 + 20}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-float-medium" />
          <div className="absolute top-3/4 left-3/4 w-48 h-48 bg-purple-300/20 rounded-full blur-3xl animate-float-fast" />
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
          {/* Hero Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-4 drop-shadow-2xl animate-fade-in-up">
            Find Your <span className="text-yellow-300">Dream Job</span> Today
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/95 mt-4 max-w-3xl mx-auto font-medium drop-shadow-lg animate-fade-in-up delay-100">
            Connect with top employers worldwide and discover opportunities that match your skills and ambitions
          </p>

          {/* Search Panel Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 mt-12 max-w-4xl mx-auto border border-white/30 animate-fade-in-up delay-200 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Keyword Input */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-500 animate-pulse" />
                  <input
                    type="text"
                    placeholder="Job title, keyword, or company"
                    className="w-full pl-12 pr-4 py-4 bg-white/80 border-2 border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-purple-300 hover:bg-white"
                  />
                </div>
              </div>

              {/* Category Dropdown */}
              <div>
                <div className="relative group">
                  <select className="w-full px-4 py-4 bg-white/80 border-2 border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 transition-all duration-300 hover:border-purple-300 hover:bg-white cursor-pointer appearance-none">
                    <option value="">All Categories</option>
                    <option value="technology">Technology</option>
                    <option value="marketing">Marketing</option>
                    <option value="design">Design</option>
                    <option value="finance">Finance</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Location Input */}
              <div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-500 animate-bounce" style={{animationDelay: '0.5s'}} />
                  <input
                    type="text"
                    placeholder="Location or remote"
                    className="w-full pl-12 pr-4 py-4 bg-white/80 border-2 border-purple-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500 transition-all duration-300 hover:border-purple-300 hover:bg-white"
                  />
                </div>
              </div>

              {/* Search Button */}
              <button
                type="button"
                className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white py-4 text-base font-semibold rounded-xl w-full md:w-auto md:col-span-1 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse-slow"
              >
                <Search className="h-5 w-5 inline mr-2 animate-spin-slow" />
                Search Jobs
              </button>
            </div>
          </div>

          {/* Action CTA Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 animate-fade-in-up delay-300">
            <Link
              to="/jobs"
              className="bg-gradient-to-r from-white to-gray-50 text-purple-700 hover:text-purple-800 hover:from-white hover:to-gray-100 px-8 py-4 rounded-xl font-semibold shadow-xl flex items-center gap-3 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
            >
              <Search className="h-5 w-5 group-hover:animate-bounce" />
              Find a Job
            </Link>
            <Link
              to="/register?type=employer"
              className="bg-gradient-to-r from-transparent via-white/10 to-transparent border-2 border-white text-white hover:bg-white/20 px-8 py-4 rounded-xl font-semibold flex items-center gap-3 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 hover:shadow-2xl group"
            >
              <Briefcase className="h-5 w-5 group-hover:animate-bounce" />
              Post a Job
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-12 bg-white -mt-8 relative z-20 rounded-t-3xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl text-purple-600 group-hover:animate-bounce">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-semibold text-gray-900 mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  <CountUp 
                    end={stat.value} 
                    duration={2} 
                    separator="," 
                    start={0}
                    enableScrollSpy
                    scrollSpyOnce
                    scrollSpyDelay={200}
                  />
                  {stat.suffix}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose JobPortal?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Everything you need for a successful job search in one platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-2 group animate-fade-in-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl text-purple-600 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Categories - Improved Grid */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Browse by Category
            </h2>
            <p className="text-gray-500 text-lg">Find jobs in your field of expertise</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobCategories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-2 group animate-fade-in-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{category.count} jobs available</p>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg text-purple-600 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                </div>
                <Link
                  to={`/jobs?category=${category.name.toLowerCase()}`}
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 text-sm font-medium group-hover:gap-2 transition-all duration-300"
                >
                  View Jobs
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white rounded-2xl p-8 md:p-12 shadow-xl animate-gradient-slow">
            <div className="mb-6">
              <CheckCircle className="h-12 w-12 mx-auto text-yellow-300 animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Start Your Career Journey Today
            </h2>
            <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful professionals who found their dream jobs
            </p>

            {/* Feature Points */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              {['Free Registration', 'No Hidden Fees', '24/7 Support'].map((text, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm animate-fade-in-up"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <CheckCircle className="h-5 w-5 text-green-300" />
                  <span className="text-white">{text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {!isAuthenticated ? (
                <>
                  <Link
                    to="/register?type=job_seeker"
                    className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Join as Job Seeker
                  </Link>
                  <Link
                    to="/register?type=employer"
                    className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                  >
                    Hire Talent
                  </Link>
                </>
              ) : isJobSeeker ? (
                <Link
                  to="/jobs"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Browse More Jobs
                </Link>
              ) : (
                <Link
                  to="/employer/post-job"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Post a Job
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Add custom animations to global styles */}
      <style>{`
        @keyframes gradient-slow {
          0%, 100% {
            background-position: 0% 50%;
            background-size: 200% 200%;
          }
          50% {
            background-position: 100% 50%;
            background-size: 200% 200%;
          }
        }
        
        @keyframes gradient-medium {
          0%, 100% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
        }
        
        @keyframes float-slow {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -50px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }
        
        @keyframes float-medium {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(-40px, 30px) rotate(180deg);
          }
        }
        
        @keyframes float-fast {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -20px);
          }
        }
        
        @keyframes particle {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-1000px) rotate(720deg);
            opacity: 0;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-gradient-slow {
          animation: gradient-slow 15s ease infinite;
        }
        
        .animate-gradient-medium {
          animation: gradient-medium 10s ease infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float-fast 10s ease-in-out infinite;
        }
        
        .animate-particle {
          animation: particle linear infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .delay-100 {
          animation-delay: 100ms;
        }
        
        .delay-200 {
          animation-delay: 200ms;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
