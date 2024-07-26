import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId') || 'default_user';
  const trips = await kv.get(`trips:${userId}`) || [];
  return NextResponse.json(trips);
}

export async function POST(request) {
  const trip = await request.json();
  const userId = trip.userId || 'default_user';
  const trips = await kv.get(`trips:${userId}`) || [];
  trips.push(trip);
  await kv.set(`trips:${userId}`, trips);
  return NextResponse.json({ message: 'Trip added successfully' });
}

export async function PUT(request) {
  const updatedTrip = await request.json();
  const userId = updatedTrip.userId || 'default_user';
  const trips = await kv.get(`trips:${userId}`) || [];
  const index = trips.findIndex(trip => trip.id === updatedTrip.id);
  if (index !== -1) {
    trips[index] = updatedTrip;
    await kv.set(`trips:${userId}`, trips);
    return NextResponse.json({ message: 'Trip updated successfully' });
  }
  return NextResponse.json({ message: 'Trip not found' }, { status: 404 });
}

export async function DELETE(request) {
  const { id, userId } = await request.json();
  const trips = await kv.get(`trips:${userId}`) || [];
  const filteredTrips = trips.filter(trip => trip.id !== id);
  if (filteredTrips.length < trips.length) {
    await kv.set(`trips:${userId}`, filteredTrips);
    return NextResponse.json({ message: 'Trip deleted successfully' });
  }
  return NextResponse.json({ message: 'Trip not found' }, { status: 404 });
}