import { getTripEntry } from "./components/getTripEntry"
import TripList from "./components/tripList"
import AddTripEntry from "./components/addTripEntry"

async function Home() {
  const tripEntry = await renderTrip()


  return (
    <main className="m-4">
      <h1 className="font-bold text-4xl">Trip to Cuba</h1>
      <TripList tripEntry={tripEntry}/>
      <AddTripEntry />

    </main>
  )
}

export default Home

export const revalidate = 100


async function renderTrip() {
  const tripEntry = await getTripEntry()
  return tripEntry
}