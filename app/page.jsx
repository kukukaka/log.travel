"use client";

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { getTrips, addTrip } from './utils/tripStorage';
import LoginForm from './components/LoginForm';

export default function Home() {
  const [trips, setTrips] = useState([]);
  const [newTripName, setNewTripName] = useState('');
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchTrips(storedUserId);
    }
  }, []);

  const fetchTrips = async (id) => {
    const fetchedTrips = await getTrips(id);
    setTrips(fetchedTrips);
  };

  const handleLogin = (id) => {
    setUserId(id);
    fetchTrips(id);
  };

  const createNewTrip = async () => {
    if (newTripName.trim() === '') return;
    const newTripId = uuidv4();
    const newTrip = { id: newTripId, name: newTripName.trim(), days: [], userId };
    try {
      await addTrip(newTrip);
      setTrips([...trips, newTrip]);
      setNewTripName('');
      router.push(`/trip/${newTripId}`);
    } catch (error) {
      console.error('Failed to create trip:', error);
    }
  };

  if (!userId) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Trip Planner</h1>
          <button
            onClick={() => {
              localStorage.removeItem('userId');
              setUserId(null);
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center">
            <input
              type="text"
              value={newTripName}
              onChange={(e) => setNewTripName(e.target.value)}
              placeholder="Enter trip name"
              className="flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mr-4 text-gray-900"
            />
            <button
              onClick={createNewTrip}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={newTripName.trim() === ''}
            >
              Create New Trip
            </button>
          </div>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Trips</h2>
          {trips.map((trip) => (
            <div key={trip.id} className="mb-4">
              <a href={`/trip/${trip.id}`} className="text-indigo-600 hover:text-indigo-900">
                {trip.name} ({trip.days.length} days)
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}