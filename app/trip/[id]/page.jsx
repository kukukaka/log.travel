"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TripDay from '../../components/TripDay';
import AddTripDayForm from '../../components/AddTripDayForm';
import { getTrips, updateTrip, deleteTrip } from '../../utils/tripStorage';

export default function TripPage({ params }) {
  const [trip, setTrip] = useState(null);
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchTrip(storedUserId);
    } else {
      router.push('/');
    }
  }, [params.id, router]);

  const fetchTrip = async (id) => {
    const trips = await getTrips(id);
    const currentTrip = trips.find((t) => t.id === params.id);
    if (currentTrip) {
      setTrip(currentTrip);
    } else {
      router.push('/');
    }
  };

  const addTripDay = async (newTripDay) => {
    if (trip) {
      const updatedTrip = {
        ...trip,
        days: [...trip.days, { ...newTripDay, id: Date.now() }],
      };
      setTrip(updatedTrip);
      await updateTrip(updatedTrip, userId);
    }
  };

  const handleDeleteTrip = async () => {
    if (trip && confirm('Are you sure you want to delete this trip?')) {
      await deleteTrip(trip.id, userId);
      router.push('/');
    }
  };

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/')}
              className="mr-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Back
            </button>
            <h1 className="text-3xl font-extrabold text-gray-900">{trip.name}</h1>
          </div>
          <button
            onClick={handleDeleteTrip}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Delete Trip
          </button>
        </div>
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <AddTripDayForm onAddTripDay={addTripDay} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          {trip.days.map((day) => (
            <TripDay key={day.id} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
}