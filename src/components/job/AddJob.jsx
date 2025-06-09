import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddJob = () => {
  const navigate = useNavigate();
  const [customSkill, setCustomSkill] = useState('');
  const [formData, setFormData] = useState({
    spa: '',
    title: 'Massage Therapist',  
    location: '',
    type: 'Full-time',
    salary: '₹25,000 - ₹35,000 per month',
    Description: '',
    experience: 'Fresh Graduate',
    openings: '',
    department: 'Massage Therapy',
    skills: '',
    about_the_role: '',
    qualifications: '',
    responsibilities: '',
    requirements: '',
    benefits: ''
  });

  const jobTitles = [
    'Massage Therapist',
    'Senior Massage Therapist',
    'Spa Manager',
    'Spa Receptionist',
    'Spa Coordinator',
  ];

  const salaryRanges = [
    '₹15,000 - ₹25,000 per month',
    '₹25,000 - ₹35,000 per month',
    '₹35,000 - ₹45,000 per month',
    '₹45,000 - ₹60,000 per month',
    '₹60,000 - ₹80,000 per month',
    '₹80,000 - ₹1,00,000 per month',
    'Above ₹1,00,000 per month'
  ];

  const experienceRanges = [
    'Fresh Graduate',
    '1-2 years',
    '2-3 years',
    '3-5 years',
    '5-7 years',
    '7-10 years',
    'Above 10 years'
  ];

  const departments = [
    'Massage Therapy',
    'Spa Operations',
    'Front Desk',
  ];

  const commonSkills = [
    'Massage Techniques',
    'Customer Service',
    'Spa Treatments',
    'Facial Treatments',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'customSkill') {
      setCustomSkill(value);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddCustomSkill = () => {
    if (customSkill.trim()) {
      const newSkill = customSkill.trim();
      const currentSkills = formData.skills ? formData.skills.split(',').map(s => s.trim()) : [];
      
      // Check if skill already exists
      if (!currentSkills.includes(newSkill)) {
        const updatedSkills = [...currentSkills, newSkill];
        setFormData(prev => ({
          ...prev,
          skills: updatedSkills.join(', ')
        }));
      }
      setCustomSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const currentSkills = formData.skills.split(',').map(s => s.trim());
    const updatedSkills = currentSkills.filter(skill => skill !== skillToRemove);
    setFormData(prev => ({
      ...prev,
      skills: updatedSkills.join(', ')
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()),
        requirements: formData.requirements.split(',').map(req => req.trim()),
        benefits: formData.benefits.split(',').map(ben => ben.trim()),
      };

      const response = await axios.post('https://spabackend-x1sr.onrender.com/api/v1/post-job', payload);  
      if (response.data.success) {
        toast.success('Job posted successfully!');
        // Navigate after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Failed to post job');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-8 py-6">
            <h2 className="text-3xl font-bold text-white">Create New Job Posting</h2>
            <p className="text-blue-100 mt-2">Fill in the details below to create a new job opportunity</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Column 1 */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h3>
                <Input 
                  label="Spa ID" 
                  name="spa" 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter your spa's unique identifier"
                />
                <Select 
                  label="Job Title" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  options={jobTitles}
                />
                <Input 
                  label="Location" 
                  name="location" 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g., New York, NY"
                />
                <Select 
                  label="Job Type" 
                  name="type" 
                  value={formData.type} 
                  onChange={handleChange} 
                  options={['Full-time', 'Part-time', 'Contract', 'Internship']} 
                />
                <Select 
                  label="Salary Range" 
                  name="salary" 
                  value={formData.salary} 
                  onChange={handleChange} 
                  options={salaryRanges}
                  required
                />
                <Select 
                  label="Experience Required" 
                  name="experience" 
                  value={formData.experience}
                  onChange={handleChange} 
                  options={experienceRanges}
                  required 
                />
                <Input 
                  label="Number of Openings" 
                  name="openings" 
                  type="number" 
                  onChange={handleChange} 
                  required 
                  placeholder="Enter number of positions"
                />
                <Select 
                  label="Department" 
                  name="department" 
                  value={formData.department}
                  onChange={handleChange} 
                  options={departments}
                  required 
                />
              </div>

              {/* Column 2 */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Detailed Information</h3>
                <Textarea 
                  label="Job Description" 
                  name="Description" 
                  onChange={handleChange} 
                  required 
                  placeholder="Provide a brief overview of the position..."
                />
                <Textarea 
                  label="About the Role" 
                  name="about_the_role" 
                  onChange={handleChange} 
                  required 
                  placeholder="Describe the role in detail, including day-to-day responsibilities..."
                />
                <Textarea 
                  label="Qualifications" 
                  name="qualifications" 
                  onChange={handleChange} 
                  required 
                  placeholder="List required education, certifications, and qualifications..."
                />
                <Textarea 
                  label="Responsibilities" 
                  name="responsibilities" 
                  onChange={handleChange} 
                  required 
                  placeholder="Detail the key responsibilities and duties..."
                />
              </div>

              {/* Full Width Fields */}
              <div className="md:col-span-2 space-y-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Additional Details</h3>
                {/* Replace the existing Skills Select with this new code block */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Required Skills</label>
                  
                  {/* Display selected skills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.skills && formData.skills.split(',').map((skill, index) => (
                      <div key={index} className="bg-blue-100 px-3 py-1 rounded-full flex items-center">
                        <span className="text-blue-800">{skill.trim()}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveSkill(skill.trim())}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="customSkill"
                      value={customSkill}
                      onChange={handleChange}
                      placeholder="Add custom skill"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddCustomSkill();
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomSkill}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add Skill
                    </button>
                  </div>
                </div>
                <Input 
                  label="Requirements" 
                  name="requirements" 
                  onChange={handleChange}
                  placeholder="Enter job requirements (comma separated)"
                />
                <Input 
                  label="Benefits" 
                  name="benefits" 
                  onChange={handleChange}
                  placeholder="Enter job benefits (comma separated)"
                />
              </div>
            </div>

            <div className="mt-8 border-t pt-8">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Input Field Component
const Input = ({ label, name, type = 'text', onChange, required, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <input
      type={type}
      name={name}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    />
  </div>
);

// Select Field Component
const Select = ({ label, name, value, onChange, options, multiple }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      multiple={multiple}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
    {multiple && (
      <p className="text-xs text-gray-500 mt-1">Hold Ctrl/Cmd to select multiple options</p>
    )}
  </div>
);

// Textarea Component
const Textarea = ({ label, name, onChange, required, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <textarea
      name={name}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 h-32 resize-none"
    />
  </div>
);

export default AddJob;
