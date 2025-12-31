import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Heart,
  Globe,
  Shield,
  Users,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-auto">
      {/* Top gradient bar */}
      <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500" />

      <div className="layout-container py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-800 rounded-xl">
                <Briefcase className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gradient">JobPortal</h2>
                <p className="text-sm text-gray-400">
                  Your Career Journey Starts Here
                </p>
              </div>
            </div>

            <p className="text-gray-300">
              Connecting exceptional talent with extraordinary opportunities worldwide.
            </p>

            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-3 bg-gray-800 rounded-xl hover:bg-gray-700 transition"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Globe className="h-5 w-5" /> Quick Links
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/" className="hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/jobs" className="hover:text-white">Browse Jobs</Link>
              </li>
              <li>
                <Link to="/companies" className="hover:text-white">Companies</Link>
              </li>
              <li>
                <Link to="/career-tips" className="hover:text-white">Career Tips</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" /> Resources
            </h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <Link to="/resume-builder" className="hover:text-white">
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to="/interview-prep" className="hover:text-white">
                  Interview Prep
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/success-stories" className="hover:text-white">
                  Success Stories
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" /> Contact & Support
            </h3>

            <ul className="space-y-4 text-gray-400">
              <li className="flex gap-3">
                <Mail className="h-4 w-4" />
                support@jobportal.in
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4" />
                +91 98765 43210
              </li>
              <li className="flex gap-3">
                <MapPin className="h-4 w-4" />
                Bengaluru, India
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p className="flex items-center gap-2">
            Made with <Heart className="h-4 w-4 text-pink-500" /> for job seekers
          </p>
          <p>© {currentYear} JobPortal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
