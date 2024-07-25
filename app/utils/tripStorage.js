const TRIPS_STORAGE_KEY = 'trips';

export const getTrips = () => {
  if (typeof window === 'undefined') return [];
  const storedTrips = localStorage.getItem(TRIPS_STORAGE_KEY);
  return storedTrips ? JSON.parse(storedTrips) : [];
};

export const saveTrips = (trips) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
};

export const addTrip = (newTrip) => {
  const trips = getTrips();
  trips.push(newTrip);
  saveTrips(trips);
};

export const updateTrip = (updatedTrip) => {
  const trips = getTrips();
  const index = trips.findIndex(trip => trip.id === updatedTrip.id);
  if (index !== -1) {
    trips[index] = updatedTrip;
    saveTrips(trips);
  }
};

export const deleteTrip = (tripId) => {
  const trips = getTrips();
  const updatedTrips = trips.filter(trip => trip.id !== tripId);
  saveTrips(updatedTrips);
};