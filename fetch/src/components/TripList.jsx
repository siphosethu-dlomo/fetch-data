import { useState, useEffect, useCallback } from 'react'
import { Button } from "flowbite-react";

export default function TripList() {
  const [trips, setTrips] = useState([])

  const [url, setUrl] = useState('http://localhost:3000/trips')

  const fetchTrips = useCallback(async () => {
    const response = await fetch(url)
    const json = await response.json()
    setTrips(json)
  }, [url])
  
  useEffect(() => {
    fetchTrips()
  }, [url], fetchTrips)

  return (
    <div>
      <>
        <h2 className='text-center mt-4 font-bold text-3xl'>Trip List</h2>
        <div className='grid place-content-center text-center mt-10'>
        <div className='flex  justify-center mb-10'>
            <Button
             className='bg-blue-500 mr-5'
             onClick={() => setUrl('http://localhost:3000/trips?loc=europe')}
            >
              European Trips
            </Button>
            <Button
             className='bg-purple-500'
             onClick={() => setUrl('http://localhost:3000/trips')}
            >
              All Trips
            </Button>
          </div>
          {trips.map(trip => (
            <div key={trip.id} className='shadow-lg hover:shadow-blue-500 text-white rounded w-96 mb-10 p-5 bg-gradient-to-r from-cyan-500 to-blue-500'>
              <h1 className='font-semibold text-2xl mb-5'>{trip.title}</h1>
              <p className=''>{trip.price}</p>
            </div>
          ))}

        </div>
      </>
    </div>
  )
}
