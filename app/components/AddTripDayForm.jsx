"use client";

import React, { useState, useEffect } from 'react';
import { countries } from 'countries-list';

const AddTripDayForm = ({ onAddTripDay, lastCountry, onCancel }) => {
  const [arrivalDate, setArrivalDate] = useState('');
  const [numberOfNights, setNumberOfNights] = useState('');
  const [country, setCountry] = useState(lastCountry || '');
  const [location, setLocation] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [accommodationLink, setAccommodationLink] = useState('');
  const [price, setPrice] = useState('');
  const [activities, setActivities] = useState('');
  const [privateNotes, setPrivateNotes] = useState('');

  const countryOptions = Object.entries(countries).map(([code, data]) => ({
    value: code,
    label: data.name
  }));

  useEffect(() => {
    setCountry(lastCountry || '');
  }, [lastCountry]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTripDay({
      arrivalDate,
      numberOfNights: parseInt(numberOfNights),
      country,
      location,
      accommodation,
      accommodationLink,
      price: parseInt(price),
      activities,
      privateNotes,
    });
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700">Arrival Date</label>
          <input
            id="arrivalDate"
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
        <div>
          <label htmlFor="numberOfNights" className="block text-sm font-medium text-gray-700">Number of Nights</label>
          <input
            id="numberOfNights"
            type="number"
            value={numberOfNights}
            onChange={(e) => setNumberOfNights(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          >
            <option value="">Select a country</option>
            {countryOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
      </div>
      <div>
        <label htmlFor="accommodation" className="block text-sm font-medium text-gray-700">Accommodation</label>
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
        <label htmlFor="accommodationLink" className="block text-sm font-medium text-gray-700">Accommodation Link</label>
        <input
          id="accommodationLink"
          type="url"
          value={accommodationLink}
          onChange={(e) => setAccommodationLink(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
        />
      </div>
      <div>
        <label htmlFor="activities" className="block text-sm font-medium text-gray-700">Activities</label>
        <textarea
          id="activities"
          value={activities}
          onChange={(e) => setActivities(e.target.value)}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
        ></textarea>
      </div>
      <div>
        <label htmlFor="privateNotes" className="block text-sm font-medium text-gray-700">Private Notes</label>
        <textarea
          id="privateNotes"
          value={privateNotes}
          onChange={(e) => setPrivateNotes(e.target.value)}
          rows={3}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900"
        ></textarea>
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Trip Day
        </button>
      </div>
    </form>
  );
};

export default AddTripDayForm;