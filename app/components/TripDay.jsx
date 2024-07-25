"use client";

const TripDay = ({ day }) => {
  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-blue-500">
      <h2 className="text-xl font-bold mb-2 ">{day.date}</h2>
      <p><strong>Accommodation:</strong> {day.accommodation}</p>
      <p><strong>Location:</strong> {day.location}</p>
      <p><strong>Activities:</strong> {day.activities}</p>
      <p><strong>Cost:</strong> ${day.cost}</p>
    </div>
  );
};

export default TripDay;