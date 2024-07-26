"use client";

const TripDay = ({ day }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{new Date(day.arrivalDate).toLocaleDateString()}</div>
        <div className="text-sm text-gray-500">{day.numberOfNights} nights</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{day.location}</div>
        <div className="text-sm text-gray-500">{day.country}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <a href={day.accommodationLink} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:text-indigo-900">
          {day.accommodation}
        </a>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        ${day.price}
      </td>
    </tr>
  );
};

export default TripDay;