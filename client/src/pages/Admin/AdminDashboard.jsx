import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, type: 'Van', status: 'Available', driver: 'John Doe', lastMaintenance: '2023-05-01' },
    { id: 2, type: 'Truck', status: 'In Use', driver: 'Jane Smith', lastMaintenance: '2023-04-15' },
    { id: 3, type: 'Car', status: 'Maintenance', driver: 'Bob Johnson', lastMaintenance: '2023-05-10' },
    { id: 4, type: 'Van', status: 'Available', driver: 'Alice Brown', lastMaintenance: '2023-04-28' },
    { id: 5, type: 'Truck', status: 'In Use', driver: 'Charlie Davis', lastMaintenance: '2023-05-05' },
  ]);

  const [drivers, setDrivers] = useState([
    { id: 1, name: 'John Doe', status: 'Active', completedTrips: 150, avgRating: 4.8 },
    { id: 2, name: 'Jane Smith', status: 'Active', completedTrips: 120, avgRating: 4.9 },
    { id: 3, name: 'Bob Johnson', status: 'Inactive', completedTrips: 90, avgRating: 4.7 },
    { id: 4, name: 'Alice Brown', status: 'Active', completedTrips: 80, avgRating: 4.6 },
    { id: 5, name: 'Charlie Davis', status: 'Active', completedTrips: 110, avgRating: 4.8 },
  ]);

  const analyticsData = [
    { name: 'Mon', trips: 12, avgTime: 45, revenue: 1200 },
    { name: 'Tue', trips: 19, avgTime: 39, revenue: 1900 },
    { name: 'Wed', trips: 15, avgTime: 42, revenue: 1500 },
    { name: 'Thu', trips: 21, avgTime: 36, revenue: 2100 },
    { name: 'Fri', trips: 25, avgTime: 38, revenue: 2500 },
    { name: 'Sat', trips: 18, avgTime: 41, revenue: 1800 },
    { name: 'Sun', trips: 11, avgTime: 44, revenue: 1100 },
  ];

  const [activeTab, setActiveTab] = useState('analytics');

  const getStatusColor = (status) => {
    switch (status) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'In Use': return 'bg-yellow-100 text-yellow-800';
      case 'Maintenance': return 'bg-red-100 text-red-800';
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
            <a href="#" className="text-gray-300 hover:text-white transition-colors">Settings</a>
            <button onClick={() => {handleLogout()}} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-2 rounded-md ${activeTab === 'analytics' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab('fleet')}
              className={`px-3 py-2 rounded-md ${activeTab === 'fleet' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              Fleet Management
            </button>
            <button
              onClick={() => setActiveTab('drivers')}
              className={`px-3 py-2 rounded-md ${activeTab === 'drivers' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              Driver Management
            </button>
          </nav>
        </div>

        {activeTab === 'analytics' && (
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Data Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Total Trips</h3>
                <p className="text-3xl font-bold text-blue-500">
                  {analyticsData.reduce((sum, day) => sum + day.trips, 0)}
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Average Trip Time</h3>
                <p className="text-3xl font-bold text-green-500">
                  {Math.round(analyticsData.reduce((sum, day) => sum + day.avgTime, 0) / analyticsData.length)} min
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Total Revenue</h3>
                <p className="text-3xl font-bold text-yellow-500">
                  ${analyticsData.reduce((sum, day) => sum + day.revenue, 0)}
                </p>
              </div>
            </div>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={analyticsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis yAxisId="left" orientation="left" stroke="#9CA3AF" />
                  <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none', color: '#fff' }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="trips" fill="#3B82F6" name="Trips" />
                  <Bar yAxisId="right" dataKey="revenue" fill="#F59E0B" name="Revenue ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

        {activeTab === 'fleet' && (
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Fleet Management</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Driver</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Last Maintenance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{vehicle.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{vehicle.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(vehicle.status)}`}>
                          {vehicle.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{vehicle.driver}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{vehicle.lastMaintenance}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-500 hover:text-blue-400 transition-colors mr-2">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-400 transition-colors">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'drivers' && (
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Driver Management</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Completed Trips</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Avg Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {drivers.map((driver) => (
                    <tr key={driver.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{driver.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{driver.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(driver.status)}`}>
                          {driver.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{driver.completedTrips}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{driver.avgRating}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-500 hover:text-blue-400 transition-colors mr-2">
                          Edit
                        </button>
                        <button className="text-red-500 hover:text-red-400 transition-colors">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            
            </div>
          </section>
        )}
      </main>

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

      <ToastContainer />
    </div>
  );
};

export default AdminDashboard;