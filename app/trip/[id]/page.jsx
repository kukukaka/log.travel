"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TripDay from '../../components/TripDay';
import AddTripDayForm from '../../components/AddTripDayForm';
import { getTrips, updateTrip, deleteTrip } from '../../utils/tripStorage';

export default function TripPage({ params }) {
  const [trip, setTrip] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
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
      setShowAddForm(false);
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

  const lastCountry = trip.days.length > 0 ? trip.days[trip.days.length - 1].country : '';

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
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accommodation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trip.days.map((day) => (
                <TripDay key={day.id} day={day} />
              ))}
              <tr>
                <td colSpan="4" className="px-6 py-4">
                  {showAddForm ? (
                    <AddTripDayForm onAddTripDay={addTripDay} lastCountry={lastCountry} onCancel={() => setShowAddForm(false)} />
                  ) : (
                    <button
                      onClick={() => setShowAddForm(true)}
                      className="w-full text-left text-indigo-600 hover:text-indigo-900"
                    >
                      + Add new entry
                    </button>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}