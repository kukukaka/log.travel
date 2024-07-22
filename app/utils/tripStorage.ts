export interface TripDayData {
  id: number;
  date: string;
  accommodation: string;
  location: string;
  activities: string;
  cost: number;
}

export interface Trip {
  id: string;
  name: string;
  days: TripDayData[];
}

const TRIPS_STORAGE_KEY = 'trips';

export const getTrips = (): Trip[] => {
  if (typeof window === 'undefined') return [];
  const storedTrips = localStorage.getItem(TRIPS_STORAGE_KEY);
  return storedTrips ? JSON.parse(storedTrips) : [];
};

export const saveTrips = (trips: Trip[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TRIPS_STORAGE_KEY, JSON.stringify(trips));
};

export const addTrip = (newTrip: Trip): void => {
  const trips = getTrips();
  trips.push(newTrip);
  saveTrips(trips);
};

export const updateTrip = (updatedTrip: Trip): void => {
  const trips = getTrips();
  const index = trips.findIndex(trip => trip.id === updatedTrip.id);
  if (index !== -1) {
    trips[index] = updatedTrip;
    saveTrips(trips);
  }
};

export const deleteTrip = (tripId: string): void => {
  const trips = getTrips();
  const updatedTrips = trips.filter(trip => trip.id !== tripId);
  saveTrips(updatedTrips);
};