import React, { useState } from 'react';
import { Building, Globe, MapPin, Phone, Mail, Users, Calendar, Upload, Save } from 'lucide-react';

const EmployerProfilePage = () => {
  const [profile, setProfile] = useState({
    companyName: 'Tech Innovations Inc.',
    email: 'contact@techinnovations.com',
    phone: '+1 (555) 123-4567',
    website: 'https://techinnovations.com',
    location: 'San Francisco, CA',
    industry: 'Technology',
    companySize: '201-500 employees',
    founded: '2015',
    description: 'A leading technology company specializing in innovative software solutions and digital transformation.',
    logo: null
  });

  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile logic here
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
            <p className="text-gray-600 mt-2">Manage your company information</p>
          </div>
          <button
            onClick={() => editMode ? handleSubmit({ preventDefault: () => {} }) : setEditMode(true)}
            className="btn-primary"
          >
            {editMode ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              'Edit Profile'
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="h-4 w-4 inline mr-2" />
                    Company Name
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profile.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      className="input-primary"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.companyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email
                  </label>
                  {editMode ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="input-primary"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Phone
                  </label>
                  {editMode ? (
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="input-primary"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Globe className="h-4 w-4 inline mr-2" />
                    Website
                  </label>
                  {editMode ? (
                    <input
                      type="url"
                      value={profile.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="input-primary"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.website}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-2" />
                    Location
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profile.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="input-primary"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="h-4 w-4 inline mr-2" />
                    Company Size
                  </label>
                  {editMode ? (
                    <select
                      value={profile.companySize}
                      onChange={(e) => handleInputChange('companySize', e.target.value)}
                      className="input-primary"
                    >
                      <option>1-10 employees</option>
                      <option>11-50 employees</option>
                      <option>51-200 employees</option>
                      <option>201-500 employees</option>
                      <option>501-1000 employees</option>
                      <option>1000+ employees</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{profile.companySize}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-2" />
                    Founded Year
                  </label>
                  {editMode ? (
                    <input
                      type="number"
                      value={profile.founded}
                      onChange={(e) => handleInputChange('founded', e.target.value)}
                      className="input-primary"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.founded}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profile.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      className="input-primary"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.industry}</p>
                  )}
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Description
                </label>
                {editMode ? (
                  <textarea
                    value={profile.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows="4"
                    className="input-primary"
                  />
                ) : (
                  <p className="text-gray-700">{profile.description}</p>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="card mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Logo</h2>
              <div className="text-center">
                <div className="h-32 w-32 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building className="h-12 w-12 text-gray-400" />
                </div>
                {editMode && (
                  <label className="btn-primary cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Logo
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                )}
              </div>
            </div>

            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Status</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Basic Information</span>
                    <span className="text-green-600">100%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Logo</span>
                    <span className="text-yellow-600">50%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-1/2"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Description</span>
                    <span className="text-green-600">90%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-11/12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfilePage;