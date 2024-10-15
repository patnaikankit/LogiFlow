import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState([
    { id: 1, type: 'Van', status: 'Available', driver: 'John Doe' },
    { id: 2, type: 'Truck', status: 'In Use', driver: 'Jane Smith' },
    { id: 3, type: 'Car', status: 'Maintenance', driver: 'Bob Johnson' },
  ]);

  const [drivers, setDrivers] = useState([
    { id: 1, name: 'John Doe', status: 'Active', completedTrips: 150, avgRating: 4.8 },
    { id: 2, name: 'Jane Smith', status: 'Active', completedTrips: 120, avgRating: 4.9 },
    { id: 3, name: 'Bob Johnson', status: 'Inactive', completedTrips: 90, avgRating: 4.7 },
  ]);

  const analyticsData = [
    { name: 'Mon', trips: 12, avgTime: 45 },
    { name: 'Tue', trips: 19, avgTime: 39 },
    { name: 'Wed', trips: 15, avgTime: 42 },
    { name: 'Thu', trips: 21, avgTime: 36 },
    { name: 'Fri', trips: 25, avgTime: 38 },
    { name: 'Sat', trips: 18, avgTime: 41 },
    { name: 'Sun', trips: 11, avgTime: 44 },
  ];

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
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {vehicles.map((vehicle) => (
                    <tr key={vehicle.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{vehicle.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{vehicle.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{vehicle.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{vehicle.driver}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Driver Activity</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Completed Trips</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Avg Rating</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {drivers.map((driver) => (
                    <tr key={driver.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{driver.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{driver.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{driver.completedTrips}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{driver.avgRating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg shadow-lg col-span-1 lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Data Analytics</h2>
            <div className="h-80">
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
                  <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                  <Legend />
                  <Bar yAxisId="left" dataKey="trips" fill="#3B82F6" name="Trips Completed" />
                  <Bar yAxisId="right" dataKey="avgTime" fill="#10B981" name="Avg Trip Time (min)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;