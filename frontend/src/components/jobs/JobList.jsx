import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';
import { Briefcase } from 'lucide-react';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with API call
    const mockJobs = [
      {
        id: '1',
        _id: '1',
        title: 'Senior React Developer',
        company: 'Tech Innovations Inc.',
        location: 'Remote',
        jobType: 'full-time',
        salaryRange: { min: 100000, max: 150000 },
        experienceLevel: 'senior',
        description: 'We are looking for an experienced React Developer to join our dynamic team. You will be responsible for building modern, responsive web applications using React and related technologies.',
        requirements: ['React', 'TypeScript', 'JavaScript', 'Redux'],
        createdAt: '2024-01-15',
        applications: 12
      },
      {
        id: '2',
        _id: '2',
        title: 'UX/UI Designer',
        company: 'Creative Minds Agency',
        location: 'New York, NY',
        jobType: 'full-time',
        salaryRange: { min: 80000, max: 110000 },
        experienceLevel: 'mid',
        description: 'Join our design team to create amazing user experiences. You will work closely with product managers and developers to design intuitive interfaces.',
        requirements: ['Figma', 'Sketch', 'Adobe Creative Suite', 'UI/UX'],
        createdAt: '2024-01-14',
        applications: 8
      },
      {
        id: '3',
        _id: '3',
        title: 'DevOps Engineer',
        company: 'Cloud Systems Ltd.',
        location: 'San Francisco, CA',
        jobType: 'contract',
        salaryRange: { min: 90000, max: 130000 },
        experienceLevel: 'mid',
        description: 'Looking for a DevOps engineer to manage our cloud infrastructure. Experience with AWS, Docker, and Kubernetes required.',
        requirements: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
        createdAt: '2024-01-13',
        applications: 6
      },
      {
        id: '4',
        _id: '4',
        title: 'Backend Developer',
        company: 'Data Systems Corp.',
        location: 'Austin, TX',
        jobType: 'full-time',
        salaryRange: { min: 95000, max: 140000 },
        experienceLevel: 'senior',
        description: 'Develop and maintain our backend services using Node.js and Python. Experience with microservices architecture preferred.',
        requirements: ['Node.js', 'Python', 'MongoDB', 'PostgreSQL'],
        createdAt: '2024-01-12',
        applications: 15
      },
      {
        id: '5',
        _id: '5',
        title: 'Marketing Intern',
        company: 'Growth Marketing Inc.',
        location: 'Chicago, IL',
        jobType: 'internship',
        salaryRange: { min: 30000, max: 40000 },
        experienceLevel: 'entry',
        description: 'Great opportunity for marketing students to gain real-world experience. Assist with social media campaigns and content creation.',
        requirements: ['Marketing', 'Social Media', 'Content Creation'],
        createdAt: '2024-01-11',
        applications: 5
      },
      {
        id: '6',
        _id: '6',
        title: 'Product Manager',
        company: 'Product Labs',
        location: 'Remote',
        jobType: 'full-time',
        salaryRange: { min: 120000, max: 180000 },
        experienceLevel: 'senior',
        description: 'Lead product development for our SaaS platform. Experience with Agile methodologies and user research required.',
        requirements: ['Product Management', 'Agile', 'User Research', 'Strategy'],
        createdAt: '2024-01-10',
        applications: 9
      }
    ];

    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="loader"></div>
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12">
        <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No jobs found</h3>
        <p className="text-gray-600">Try adjusting your search filters</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};

export default JobList;