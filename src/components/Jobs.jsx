import React, { useState } from 'react';
import AddJob from './job/AddJob';
import GetAllJobs from './job/GetAllJobs';
import ViewApplications from './job/ViewApplications';

const Jobs = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded ${
            activeTab === 'all'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          All Jobs
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded ${
            activeTab === 'add'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Add New Job
        </button>
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded ${
            activeTab === 'applications'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          View Applications
        </button>
      </div>

      {activeTab === 'all' && <GetAllJobs />}
      {activeTab === 'add' && <AddJob />}
      {activeTab === 'applications' && <ViewApplications />}
    </div>
  );
};

export default Jobs;