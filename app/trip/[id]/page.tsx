"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TripDay from '../../components/TripDay';
import AddTripDayForm from '../../components/AddTripDayForm';
import { Trip, TripDayData, getTrips, updateTrip, deleteTrip } from '../../utils/tripStorage';

interface TripDayData {
  id: number;
  date: string;
  accommodation: string;
  location: string;
  activities: string;
  cost: number;
}

interface Trip {
  id: string;
  name: string;
  days: TripDayData[];
}

export default function TripPage({ params }: { params: { id: string } }) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedTrips = localStorage.getItem('trips');
    if (storedTrips) {
      const trips: Trip[] = JSON.parse(storedTrips);
      const currentTrip = trips.find((t) => t.id === params.id);
      if (currentTrip) {
        setTrip(currentTrip);
      } else {
        router.push('/');
      }
    } else {
      router.push('/');
    }
  }, [params.id, router]);

  const addTripDay = (newTripDay: TripDayData) => {
    if (trip) {
      const updatedTrip = {
        ...trip,
        days: [...trip.days, { ...newTripDay, id: Date.now() }],
      };
      setTrip(updatedTrip);

      const storedTrips = localStorage.getItem('trips');
      if (storedTrips) {
        const trips: Trip[] = JSON.parse(storedTrips);
        const updatedTrips = trips.map((t) => (t.id === trip.id ? updatedTrip : t));
        localStorage.setItem('trips', JSON.stringify(updatedTrips));
      }
    }
  };

  const handleDeleteTrip = () => {
    if (confirm('Are you sure you want to delete this trip?')) {
      deleteTrip(trip.id);
      router.push('/');
    }
  };

  if (!trip) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{trip.name}</h1>
        <button
          onClick={handleDeleteTrip}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Delete Trip
        </button>
      </div>
      <AddTripDayForm onAddTripDay={addTripDay} />
      <div className="mt-8">
        {trip.days.map((day) => (
          <TripDay key={day.id} day={day} />
        ))}
      </div>
    </div>
  );
}