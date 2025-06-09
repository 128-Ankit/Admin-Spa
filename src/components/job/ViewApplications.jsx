import { useEffect, useState } from 'react';
import { getAllJob, updateJob } from '../../api/jobsApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewApplications = () => {
  const [jobs, setJobs] = useState([]);
  const [updating, setUpdating] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    date: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getAllJob();
        setJobs(response.data || []);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        toast.error("Failed to load jobs");
      }
    };
    fetchJobs();
  }, []);

  const handleStatusChange = async (jobId, newStatus) => {
    setUpdating(jobId);
    try {
      const requestData = { status: newStatus };
      const response = await updateJob(jobId, requestData);
      if (response.data?.success) {
        setJobs(jobs.map(job =>
          job._id === jobId ? { ...job, status: newStatus } : job
        ));
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error(response.data?.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      toast.error(error.response?.data?.error || 'Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  // Filter and search jobs
  const filteredJobs = jobs.filter(job => {
    const searchMatch = 
      job.carrier?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const statusMatch = !filters.status || job.status === filters.status;
    
    const dateMatch = !filters.date || (() => {
      const jobDate = new Date(job.createdAt).toLocaleDateString();
      const filterDate = new Date(filters.date).toLocaleDateString();
      return jobDate === filterDate;
    })();

    return searchMatch && statusMatch && dateMatch;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const headers = [
    "Job Title", "Applicant", "Email", "Address",
    "Phone", "Status", "Applied Date", "Actions"
  ];

  return (
    <div className="p-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by title, name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
            className="px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            {['Pending', 'Reviewing', 'Shortlisted', 'Rejected'].map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters(prev => ({ ...prev, date: e.target.value }))}
            className="px-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentJobs.map((job) => (
              <tr key={job._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4">{job.carrier?.title || 'N/A'}</td>
                <td className="px-6 py-4">{`${job.first_name} ${job.last_name}`}</td>
                <td className="px-6 py-4">{job.email}</td>
                <td className="px-6 py-4">{job.carrier?.location || 'N/A'}</td>
                <td className="px-6 py-4">{job.phone}</td>

                <td className="px-6 py-4">
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(job._id, e.target.value)}
                    disabled={updating === job._id}
                    className={`px-3 py-1 rounded text-sm transition-colors duration-200
                      ${job.status === 'Reviewing' ? 'bg-green-100 text-green-700' :
                        job.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                          job.status === 'Shortlisted' ? 'bg-blue-100 text-blue-700' :
                            'bg-yellow-100 text-yellow-700'
                      }`}
                  >
                    {['Pending', 'Reviewing', 'Shortlisted','Rejected'].map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                  {updating === job._id && (
                    <span className="ml-2 text-xs text-gray-500">Updating...</span>
                  )}
                </td>

                <td className="px-6 py-4">
                  {job.createdAt
                    ? new Date(job.createdAt).toLocaleDateString()
                    : 'N/A'}
                </td>

                <td className="px-6 py-4">
                  {job.resume ? (
                    <a
                      href={job.resume}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">No Resume</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredJobs.length)} of {filteredJobs.length} results
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewApplications;
