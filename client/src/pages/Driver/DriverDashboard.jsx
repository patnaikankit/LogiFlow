import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

const DriverDashboard = () => {
  const [availableJobs, setAvailableJobs] = useState([]); 

  const [acceptedJob, setAcceptedJob] = useState(null);

  const [jobStatus, setJobStatus] = useState('');


  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/driver/new-booking`); 
        console.log(response);
        
        if (response.data.success) {
          const { pickupLocation, dropOffLocation, vehicleType } = response.data.booking;
          const job = {
            id: response.data.booking._id,
            pickup: pickupLocation,
            dropoff: dropOffLocation,
            vehicle: vehicleType,
          };
          setAvailableJobs((prevJobs) => [...prevJobs, job]);
        }
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    if (window.performance) {
      const navigationType = window.performance.getEntriesByType('navigation')[0].type;
      
      if (navigationType === 'reload') {
        fetchJobs();  
      }
    }
  }, []);

  const handleAcceptJob = async (job) => {
    console.log(`Job ID: ${job.id}`);
    console.log(`${localStorage.getItem('driverID')}`);
    console.log(`${localStorage.getItem('driverToken')}`);
    

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/driver/accept-booking/booking/${job.id}/vehicle/${localStorage.getItem('driverID')}`,
        { status: 'Accepted' }, 
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
          },
        }
      );
      console.log(response);
      
  
      if (response.data.success) {
        console.log("Booking updated successfully.");
        setAcceptedJob(job);
        setAvailableJobs(availableJobs.filter(j => j.id !== job.id));
        setJobStatus('Accepted');
      }
    } catch (error) {
      console.error("Error accepting job:", error);
    }
  };
  

  const handleUpdateStatus = async (newStatus, job) => {
    try {
      console.log(`${job}`);
      
      setJobStatus(newStatus);

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/driver/update-booking/booking/${job}/`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, 
          },
        }
      );
      

      if (response.data.success) {
        console.log('Status updated successfully:', response.data);
        toast.success(`Job status updated to ${newStatus}`);
      } else {
        console.error('Failed to update status');
        toast.error('Failed to update job status');
      }
    } catch (error) {
      console.error('Error updating job status:', error);
      toast.error('An error occurred while updating job status');
    }
  };
  

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  } 


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
            <button onClick={handleLogout} className="text-gray-300 hover:text-white transition-colors">Logout</button>
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
                      onClick={() => handleUpdateStatus('En route to pickup', acceptedJob.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    >
                      En route to pickup
                    </button>
                    <button
                      onClick={() => handleUpdateStatus('Goods collected', acceptedJob.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    >
                      Goods collected
                    </button>
                    <button
                      onClick={() => handleUpdateStatus('En route to drop-off', acceptedJob.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                    >
                      En route to drop-off
                    </button>
                    <button
                      onClick={() => handleUpdateStatus('Delivered', acceptedJob.id)}
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