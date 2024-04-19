import { useState } from 'react'

type ApiFunctionWithArg<T, A> = (arg: A) => Promise<T>
type ResetData = () => void
type MutateFunction<A> = (arg?: A) => Promise<void>
type Error = string | null
type IsLoading = boolean
/**
 * Custom hook for fetching data from an API.
 *
 * @template S - The type of the fetched data.
 * @template A - The type of the argument passed to the API function.
 * @param {ApiFunctionWithArg<S, A>} apiFunction - The API function to be called.
 * @returns [IsLoading, S, MutateFunction<A>, Error, ResetData] - An array containing the loading state, fetched data, mutate function, error, and reset function.
 */
export default function fetchApi<S, A>(
  apiFunction: ApiFunctionWithArg<S, A>,
): [IsLoading, S, MutateFunction<A>, Error, ResetData]

export default function fetchApi<S, A>(apiFunction: ApiFunctionWithArg<S, A>) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [response, setResponse] = useState<S | null>(null)
  const fetch = async (arg?: A) => {
    setLoading(true)
    try {
      const response = await apiFunction(arg!)
      if (response) {
        setResponse(response)
      }
    } catch (error) {
      console.log('fetching', error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An error occurred')
      }
    }

    setLoading(false)
  }
  const handleResetData = () => {
    setResponse(null)
    setError(null)
  }
  return [loading, response, fetch, error, handleResetData]
}
