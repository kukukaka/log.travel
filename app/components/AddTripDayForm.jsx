"use client";

import React, { useState } from 'react';

const AddTripDayForm = ({ onAddTripDay }) => {
  const [date, setDate] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [location, setLocation] = useState('');
  const [activities, setActivities] = useState('');
  const [cost, setCost] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTripDay({
      date,
      accommodation,
      location,
      activities,
      cost: parseFloat(cost),
    });
    setDate('');
    setAccommodation('');
    setLocation('');
    setActivities('');
    setCost('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="accommodation" className="block text-sm font-medium text-gray-700">
          Accommodation
        </label>
        <input
          id="accommodation"
          type="text"
          value={accommodation}
          onChange={(e) => setAccommodation(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location
        </label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="activities" className="block text-sm font-medium text-gray-700">
          Activities
        </label>
        <textarea
          id="activities"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          required
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="cost" className="block text-sm font-medium text-gray-700">
          Cost
        </label>
        <input
          id="cost"
          type="number"
          step="0.01"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Trip Day
        </button>
      </div>
    </form>
  );
};

export default AddTripDayForm;