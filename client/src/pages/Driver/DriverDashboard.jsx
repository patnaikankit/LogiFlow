import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DriverDashboard = () => {
  const [availableJobs, setAvailableJobs] = useState([]);
  const [acceptedJob, setAcceptedJob] = useState(null);
  const [jobStatus, setJobStatus] = useState('');
  const [activeTab, setActiveTab] = useState('available');

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
    console.log(`Driver ID: ${localStorage.getItem('driverID')}`);
    console.log(`Driver Token: ${localStorage.getItem('accessToken')}`);

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
      
      if (response.data.success) {
        console.log("Booking updated successfully.");
        setAcceptedJob(job);
        setAvailableJobs(availableJobs.filter(j => j.id !== job.id));
        setJobStatus('Accepted');
        toast.success('Job Accepted');
      }
    } catch (error) {
      console.error("Error accepting job:", error);
      toast.error('Failed to accept job');
    }
  };

  const handleUpdateStatus = async (newStatus, job) => {
    try {
      setJobStatus(newStatus);

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/driver/update-booking/booking/${job.id}/`,
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

  const renderStatusButton = (label, status) => (
    <button
      onClick={() => handleUpdateStatus(status, acceptedJob)}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
    >
      {label}
    </button>
  );

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
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
          <nav className="flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Profile</a>
            <button
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Driver Dashboard</h1>

        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('available')}
              className={`px-3 py-2 rounded-md ${activeTab === 'available' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              Available Jobs
            </button>
            <button
              onClick={() => setActiveTab('current')}
              className={`px-3 py-2 rounded-md ${activeTab === 'current' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              Current Job
            </button>
          </nav>
        </div>

        {activeTab === 'available' && (
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Available Jobs</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableJobs.map((job) => (
                <div key={job.id} className="bg-gray-700 p-4 rounded-lg shadow">
                  <h3 className="text-lg font-semibold mb-2">Job #{job.id}</h3>
                  <p className="text-gray-300 mb-1"><strong>Pickup:</strong> {job.pickup}</p>
                  <p className="text-gray-300 mb-1"><strong>Drop-off:</strong> {job.dropoff}</p>
                  <p className="text-gray-300 mb-1"><strong>Vehicle:</strong> {job.vehicle}</p>
                  <button
                    onClick={() => handleAcceptJob(job)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
                  >
                    Accept Job
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'current' && (
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Current Job</h2>
            {acceptedJob ? (
              <div className="space-y-6">
                <div className="bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Job Details</h3>
                  <p className="text-gray-300 mb-2"><strong>Pickup:</strong> {acceptedJob.pickup}</p>
                  <p className="text-gray-300 mb-2"><strong>Drop-off:</strong> {acceptedJob.dropoff}</p>
                  <p className="text-gray-300 mb-2"><strong>Vehicle:</strong> {acceptedJob.vehicle}</p>
                  <p className="text-gray-300 mb-2"><strong>Status:</strong> {jobStatus}</p>
                  <div className="space-y-4">
                    {renderStatusButton("In Progress", "In Progress")}
                    {renderStatusButton("Delivered", "Delivered")}
                    {renderStatusButton("Goods collected", "Goods collected")}
                    {renderStatusButton("En route to drop-off", "En route to drop-off")}
                    {renderStatusButton("En route to pick-up", "En route to pick-up")}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-300">You don't have any accepted job yet.</p>
            )}
          </section>
        )}

        <section className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Jobs Completed Today</h3>
              <p className="text-3xl font-bold text-blue-500">5</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Total Distance</h3>
              <p className="text-3xl font-bold text-green-500">78.3 miles</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Average Rating</h3>
              <p className="text-3xl font-bold text-yellow-500">4.8 / 5</p>
            </div>
          </div>
        </section>

        <footer className="bg-gray-800 mt-12">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">© 2023 LogiFlow. All rights reserved.</div>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white mr-4">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white mr-4">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white">Contact Us</a>
          </div>
        </div>
      </footer>
      </main>

      <ToastContainer />
    </div>
  );
};

export default DriverDashboard;
