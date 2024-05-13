import { useState, useEffect} from "react"

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  // loading state
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async () => {
      try {
        setIsPending(true)

        const res = await fetch(url, { signal: controller.signal })
        if(!res.ok) {
          throw new Error(res.statusText)
        }
        const json = await res.json()

        setIsPending(false)
        setData(json)
        setError(null)
      } catch (error) {
        if(error.message === "AbortError") {
          console.log("the fetch was aborted");
        } else {
          setIsPending(false)
          setError('Could not fetch the data')
        }
       
      }
    }

    fetchData()
    return () => {
      controller.abort()
    }

  }, [url])

  return { data, isPending, error }
}