import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [newBooking, setNewBooking] = useState({
    pickupLocation: '',
    dropOffLocation: '',
    vehicleType: '',
    date: '',
  });
  const [activeTab, setActiveTab] = useState('bookings');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const userID = localStorage.getItem('userID'); 
        if (userID) {
          const response = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user/fetch-bookings/user/${userID}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`, 
              },
            }
          );
  
          if (response.data.success) {
            const formattedBookings = response.data.data.map((booking) => ({
              id: booking._id,
              pickup: booking.pickupLocation,
              dropoff: booking.dropOffLocation,
              vehicle: booking.vehicleType,
              status: booking.status,
              price: booking.estimatedCost,
              date: booking.date,
            }));
            setBookings(formattedBookings); 
          } else {
            console.log('Failed to fetch bookings');
          }
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    const intervalId = setInterval(fetchBookings, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBooking((prevBooking) => ({
      ...prevBooking,
      [name]: value, 
    }));
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleStatusUpdate = async (bookingID) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/update-booking/booking/${bookingID}`,
        { status: 'Updated Status' },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
  
      if (response.data.success) {
        const updatedBooking = response.data.booking;
        setBookings((prevBookings) =>
          prevBookings.map((booking) =>
            booking.id === updatedBooking.id
              ? { ...booking, status: updatedBooking.status }
              : booking
          )
        );
        toast.success('Booking status updated successfully!');
      } else {
        toast.error('Failed to update booking status.');
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('An error occurred while updating the booking status.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBookingData = { ...newBooking };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user/booking/${localStorage.getItem('userID')}`,
        newBookingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
  
      if (response.status === 201) {
        setBookings((prev) => [...prev, newBookingData]);
        toast.success('Booking created successfully!');
      } else {
        toast.error('Failed to create booking. Please try again.');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
      console.error(error);
    } finally {
      setNewBooking({ pickupLocation: '', dropOffLocation: '', vehicleType: 'Train', date: '' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500 text-white';
      case 'Goods collected':
        return 'bg-yellow-500 text-white';
      case 'En route to drop-off':
        return 'bg-blue-500 text-white'
      case 'En route to pick-up':
        return 'bg-blue-500 text-white'
      default:
        return 'bg-red-500 text-white';
    }
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
            <button onClick={handleLogout} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors">
              Logout
            </button>
          </nav>
        </div>
      </header>
  
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome, User!</h1>
  
        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`px-3 py-2 rounded-md ${activeTab === 'bookings' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              Your Bookings
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`px-3 py-2 rounded-md ${activeTab === 'new' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              New Booking
            </button>
          </nav>
        </div>
  
        {activeTab === 'bookings' && (
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Pickup</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Drop-off</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Vehicle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.pickup}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.dropoff}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{booking.vehicle}</td>
                      <td className="px-6 py-4 whitespace-nowrap">${booking.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status)}`}>{booking.status}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleStatusUpdate(booking.id)}
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition-colors"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
  
        {activeTab === 'new' && (
          <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Create New Booking</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-400 mb-1">
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    id="pickupLocation"
                    name="pickupLocation"
                    value={newBooking.pickupLocation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                  />
                </div>
  
                <div className="mb-4">
                  <label htmlFor="dropOffLocation" className="block text-sm font-medium text-gray-400 mb-1">
                    Drop-Off Location
                  </label>
                  <input
                    type="text"
                    id="dropOffLocation"
                    name="dropOffLocation"
                    value={newBooking.dropOffLocation}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                  />
                </div>
  
                <div className="mb-4">
                  <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-400 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    id="vehicleType"
                    name="vehicleType"
                    value={newBooking.vehicleType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                  >
                    <option value="">Select Vehicle</option>
                    <option value="Train">Train</option>
                    <option value="Bus">Bus</option>
                    <option value="Cab">Cab</option>
                  </select>
                </div>
  
                <div className="mb-4">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-400 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newBooking.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-900 text-white"
                  />
                </div>
              </div>
  
              <button
                type="submit"
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Create Booking
              </button>
            </form>
          </section>
        )}
  
        <section className="mt-8 bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Total Bookings</h3>
              <p className="text-3xl font-bold text-blue-500">{bookings.length}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Completed Bookings</h3>
              <p className="text-3xl font-bold text-green-500">
                {bookings.filter(booking => booking.status === 'Completed').length}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h3 className="text-lg font-medium mb-2">Total Spent</h3>
              <p className="text-3xl font-bold text-yellow-500">
                ${bookings.reduce((total, booking) => total + booking.price, 0)}
              </p>
            </div>
          </div>
        </section>
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
    </div>
  );
  
};

export default UserDashboard;
