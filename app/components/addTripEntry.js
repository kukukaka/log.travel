'use client'

import { useState } from 'react';

export default function AddTripEntry() {
    const [formData, setFormData] = useState({
        type: "",
        origin_name: "",
        destination_name: "",
        country: "",
        description: "",
        coordinates: null,
        date: null,
        attachments: null,
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          authorId: '',  // Adjust this as per your needs
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert('Entry added successfully!');
    } catch (error) {
      console.error('Error adding trip entry:', error);
      alert('Failed to add the entry.');
    }
  };

  return (
    <div className='pt-16'>
      <h1 className='text-xl font-semibold pb-4'>Add event</h1>
      <form onSubmit={handleSubmit}>

        <div className='pb-6'>
            <label className=" text-sm font-medium leading-6 text-slate-300">
            Type of event
            </label>
            <div className="mt-2">
            <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="pl-[8px] w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Hotel"
            />
            </div>
        </div>
        <div className='pb-6'>
            <label className=" text-sm font-medium leading-6 text-slate-300">
            Location name
            </label>
            <div className="mt-2">
            <input
                type="text"
                name="origin_name"
                value={formData.origin_name}
                onChange={handleChange}
                className="pl-[8px] w-64 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Albacete"
            />
            </div>
        </div>
        <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
        Add
      </button>
      </form>
    </div>
  );
}
