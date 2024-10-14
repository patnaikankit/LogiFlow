import React, { useState } from 'react';

const DriverDashboard = () => {
  const [availableJobs, setAvailableJobs] = useState([
    { id: 1, pickup: '123 Main St', dropoff: '456 Elm St', vehicle: 'Van' },
    { id: 2, pickup: '789 Oak Ave', dropoff: '321 Pine Rd', vehicle: 'Truck' },
  ]);

  const [acceptedJob, setAcceptedJob] = useState(null);

  const [jobStatus, setJobStatus] = useState('');

  const handleAcceptJob = (job) => {
    setAcceptedJob(job);
    setAvailableJobs(availableJobs.filter(j => j.id !== job.id));
    setJobStatus('Accepted');
  };

  const handleUpdateStatus = (newStatus) => {
    setJobStatus(newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8 text-blue-500 mr-2"
            >
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
            <span className="text-xl font-bold text-blue-500">LogiFlow</span>
          </div>
          <nav>
            <button className="text-gray-300 hover:text-white transition-colors">Logout</button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Driver Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pickup</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Drop-off</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {availableJobs.map((job) => (
                    <tr key={job.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{job.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{job.pickup}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{job.dropoff}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{job.vehicle}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleAcceptJob(job)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                        >
                          Accept
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Current Job</h2>
            {acceptedJob ? (
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Job Details</h3>
                  <p><strong>ID:</strong> {acceptedJob.id}</p>
                  <p><strong>Pickup:</strong> {acceptedJob.pickup}</p>
                  <p><strong>Drop-off:</strong> {acceptedJob.dropoff}</p>
                  <p><strong>Vehicle:</strong> {acceptedJob.vehicle}</p>
                  <p><strong>Status:</strong> {jobStatus}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Update Status</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleUpdateStatus('En route to pickup')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    >
                      En route to pickup
                    </button>
                    <button
                      onClick={() => handleUpdateStatus('Goods collected')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    >
                      Goods collected
                    </button>
                    <button
                      onClick={() => handleUpdateStatus('En route to drop-off')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    >
                      En route to drop-off
                    </button>
                    <button
                      onClick={() => handleUpdateStatus('Delivered')}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    >
                      Delivered
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">No job currently accepted. Accept a job from the available jobs list.</p>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;