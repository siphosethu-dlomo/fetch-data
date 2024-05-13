import { useState } from 'react'
import { Button, Spinner, Alert } from "flowbite-react";
import { useFetch } from '../hooks/useFetch';

export default function TripList() {
  const [url, setUrl] = useState('http://localhost:3000/trips')

  const { data: trips, isPending, error } = useFetch(url)

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
          {/* loading state */}
          {isPending && <div className="text-center mb-4">
            <Spinner color="info" className='h-20 w-20' />
          </div>}
          {/* loading state */}
          {error &&
            <Alert color="failure">
              <span className="font-medium">Error: </span>Could not fetch the data
          </Alert>}

          {trips && trips.map(trip => (
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
