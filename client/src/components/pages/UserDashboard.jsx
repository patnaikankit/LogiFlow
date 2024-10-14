import React, { useState } from 'react';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([
    { id: 1, pickup: '123 Main St', dropoff: '456 Elm St', vehicle: 'Van', status: 'In Progress' },
    { id: 2, pickup: '789 Oak Ave', dropoff: '321 Pine Rd', vehicle: 'Truck', status: 'Completed' },
  ]);

  const [newBooking, setNewBooking] = useState({
    pickup: '',
    dropoff: '',
    vehicle: 'Van',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = bookings.length + 1;
    setBookings(prev => [...prev, { ...newBooking, id, status: 'Pending' }]);
    setNewBooking({ pickup: '', dropoff: '', vehicle: 'Van' });
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
        <h1 className="text-3xl font-bold mb-8">Welcome, User!</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">New Booking</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="pickup" className="block text-sm font-medium text-gray-300">Pickup Location</label>
                <input
                  type="text"
                  id="pickup"
                  name="pickup"
                  value={newBooking.pickup}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="dropoff" className="block text-sm font-medium text-gray-300">Drop-off Location</label>
                <input
                  type="text"
                  id="dropoff"
                  name="dropoff"
                  value={newBooking.dropoff}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="vehicle" className="block text-sm font-medium text-gray-300">Vehicle Type</label>
                <select
                  id="vehicle"
                  name="vehicle"
                  value={newBooking.vehicle}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <option value="Van">Van</option>
                  <option value="Truck">Truck</option>
                  <option value="Car">Car</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
              >
                Create Booking
              </button>
            </form>
          </section>

          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pickup</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Drop-off</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.pickup}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.dropoff}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.vehicle}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-500 hover:text-blue-400 transition-colors">
                          Track
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;