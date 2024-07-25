import { NextResponse } from 'next/server';
import db from '../db';

function getUserId(request) {
  if (request.method === 'GET') {
    const url = new URL(request.url);
    return url.searchParams.get('userId') || 'default_user';
  }
  // For POST, PUT, DELETE requests, userId should be in the body
  return request.userId || 'default_user';
}

export async function GET(request) {
  const userId = getUserId(request);
  const trips = db.prepare('SELECT * FROM trips WHERE userId = ?').all(userId);
  return NextResponse.json(trips.map(trip => ({
    ...trip,
    days: JSON.parse(trip.days)
  })));
}

export async function POST(request) {
  const trip = await request.json();
  const userId = trip.userId || getUserId(request);
  db.prepare('INSERT INTO trips (id, name, days, userId) VALUES (?, ?, ?, ?)').run(
    trip.id,
    trip.name,
    JSON.stringify(trip.days),
    userId
  );
  return NextResponse.json({ message: 'Trip added successfully' });
}

export async function PUT(request) {
  const trip = await request.json();
  const userId = trip.userId || getUserId(request);
  const result = db.prepare('UPDATE trips SET name = ?, days = ? WHERE id = ? AND userId = ?').run(
    trip.name,
    JSON.stringify(trip.days),
    trip.id,
    userId
  );
  if (result.changes === 0) {
    return NextResponse.json({ message: 'Trip not found or unauthorized' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Trip updated successfully' });
}

export async function DELETE(request) {
  const { id, userId } = await request.json();
  const result = db.prepare('DELETE FROM trips WHERE id = ? AND userId = ?').run(id, userId);
  if (result.changes === 0) {
    return NextResponse.json({ message: 'Trip not found or unauthorized' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Trip deleted successfully' });
}