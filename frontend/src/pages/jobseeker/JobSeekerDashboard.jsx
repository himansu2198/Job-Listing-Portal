import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Briefcase, GraduationCap, FileText, Upload, Save, X } from 'lucide-react';

const JobSeekerProfilePage = () => {
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    title: 'Frontend Developer',
    summary: 'Experienced Frontend Developer with 5+ years of experience building modern web applications using React, TypeScript, and modern JavaScript. Passionate about creating responsive, user-friendly interfaces.',
    education: [
      {
        id: 1,
        degree: 'Bachelor of Science in Computer Science',
        school: 'University of Technology',
        year: '2015-2019'
      }
    ],
    experience: [
      {
        id: 1,
        position: 'Senior Frontend Developer',
        company: 'Tech Innovations Inc.',
        period: '2021-Present',
        description: 'Lead frontend development for multiple projects using React and TypeScript.'
      },
      {
        id: 2,
        position: 'Frontend Developer',
        company: 'Digital Solutions',
        period: '2019-2021',
        description: 'Developed responsive web applications and collaborated with UX designers.'
      }
    ],
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Redux', 'Next.js', 'Git', 'REST APIs'],
    resume: null
  });

  const [editMode, setEditMode] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [newSkill, setNewSkill] = useState('');

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setProfile(prev => ({ ...prev, resume: file.name }));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save profile logic here
    setEditMode(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <p className="text-gray-600 mt-2">Manage your personal information and resume</p>
          </div>
          <div className="flex gap-3">
            {editMode ? (
              <>
                <button
                  onClick={() => setEditMode(false)}
                  className="btn-outline"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn-primary"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="btn-primary"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Basic Info */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-2" />
                    Full Name
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="input-primary"
                    />
                  ) : (
                    <p className="text-gray-900">{profile.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-2" />
                    Email Address
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
                    Phone Number
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
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="h-4 w-4 inline mr-2" />
                  Professional Title
                </label>
                {editMode ? (
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="input-primary"
                  />
                ) : (
                  <p className="text-gray-900">{profile.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Summary
                </label>
                {editMode ? (
                  <textarea
                    value={profile.summary}
                    onChange={(e) => handleInputChange('summary', e.target.value)}
                    rows="4"
                    className="input-primary"
                  />
                ) : (
                  <p className="text-gray-700 whitespace-pre-line">{profile.summary}</p>
                )}
              </div>
            </div>

            {/* Skills */}
            <div className="card mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Skills</h2>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {profile.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="inline-flex items-center gap-1 px-3 py-2 bg-primary-100 text-primary-800 rounded-full text-sm"
                  >
                    {skill}
                    {editMode && (
                      <button 
                        onClick={() => removeSkill(skill)}
                        className="text-primary-800 hover:text-primary-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {editMode && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    placeholder="Add a skill"
                    className="flex-1 input-primary"
                  />
                  <button
                    onClick={addSkill}
                    className="btn-primary"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>

            {/* Experience */}
            <div className="card mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Work Experience</h2>
              
              <div className="space-y-6">
                {profile.experience.map((exp) => (
                  <div key={exp.id} className="border-l-4 border-primary-500 pl-4">
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{exp.period}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>

              {editMode && (
                <button className="mt-4 text-primary-600 hover:text-primary-700">
                  + Add Experience
                </button>
              )}
            </div>

            {/* Education */}
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Education</h2>
              
              <div className="space-y-6">
                {profile.education.map((edu) => (
                  <div key={edu.id} className="flex items-start gap-4">
                    <GraduationCap className="h-6 w-6 text-primary-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                      <p className="text-gray-600">{edu.school}</p>
                      <p className="text-sm text-gray-500">{edu.year}</p>
                    </div>
                  </div>
                ))}
              </div>

              {editMode && (
                <button className="mt-4 text-primary-600 hover:text-primary-700">
                  + Add Education
                </button>
              )}
            </div>
          </div>

          {/* Right Column - Resume & Stats */}
          <div className="lg:col-span-1">
            {/* Resume Upload */}
            <div className="card mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Resume</h2>
              
              <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary-400 transition-colors">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                
                {profile.resume ? (
                  <>
                    <p className="font-medium text-gray-900 mb-2">{profile.resume}</p>
                    <div className="flex gap-2 justify-center">
                      <button className="text-sm text-primary-600 hover:text-primary-700">
                        Download
                      </button>
                      <span className="text-gray-400">|</span>
                      <button className="text-sm text-red-600 hover:text-red-700">
                        Remove
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-600 mb-4">Upload your resume (PDF, DOC, DOCX)</p>
                    <label className="btn-primary cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Resume
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                    </label>
                  </>
                )}
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                A complete resume increases your chances of getting hired by 40%.
              </p>
            </div>

            {/* Profile Completion */}
            <div className="card mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Completion</h2>
              
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
                    <span className="text-gray-600">Skills</span>
                    <span className="text-green-600">90%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-11/12"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Experience</span>
                    <span className="text-yellow-600">75%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 w-3/4"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Resume</span>
                    <span className="text-red-600">40%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-2/5"></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-3 bg-primary-50 rounded-lg">
                <p className="text-sm text-primary-800">
                  Complete your profile to increase visibility to employers.
                </p>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Profile Visibility</p>
                    <p className="text-sm text-gray-600">Who can see your profile</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Job Alerts</p>
                    <p className="text-sm text-gray-600">Receive email notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSeekerProfilePage;