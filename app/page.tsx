"use client";

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { Trip, getTrips, addTrip } from './utils/tripStorage';

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [newTripName, setNewTripName] = useState('');
  const router = useRouter();

  useEffect(() => {
    setTrips(getTrips());
  }, []);

  const createNewTrip = () => {
    if (newTripName.trim() === '') return;
    const newTripId = uuidv4();
    const newTrip: Trip = { id: newTripId, name: newTripName.trim(), days: [] };
    addTrip(newTrip);
    setTrips([...trips, newTrip]);
    setNewTripName('');
    router.push(`/trip/${newTripId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Trip Planner</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newTripName}
          onChange={(e) => setNewTripName(e.target.value)}
          placeholder="Enter trip name"
          className="shadow appearance-none border rounded w-64 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
        />
        <button
          onClick={createNewTrip}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          disabled={newTripName.trim() === ''}
        >
          Create New Trip
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Your Trips</h2>
        {trips.map((trip) => (
          <div key={trip.id} className="mb-4">
            <a href={`/trip/${trip.id}`} className="text-blue-500 hover:text-blue-700">
              {trip.name} ({trip.days.length} days)
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}