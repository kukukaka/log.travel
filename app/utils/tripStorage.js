export const getTrips = async (userId) => {
  const response = await fetch(`/api/trips?userId=${userId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch trips');
  }
  return await response.json();
};

export const addTrip = async (newTrip) => {
  const response = await fetch('/api/trips', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...newTrip,
      userId: localStorage.getItem('userId')
    })
  });
  if (!response.ok) {
    throw new Error('Failed to add trip');
  }
};

export const updateTrip = async (updatedTrip) => {
  const response = await fetch('/api/trips', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...updatedTrip,
      userId: localStorage.getItem('userId')
    })
  });
  if (!response.ok) {
    throw new Error('Failed to update trip');
  }
};

export const deleteTrip = async (tripId, userId) => {
  const response = await fetch('/api/trips', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: tripId, userId })
  });
  if (!response.ok) {
    throw new Error('Failed to delete trip');
  }
};