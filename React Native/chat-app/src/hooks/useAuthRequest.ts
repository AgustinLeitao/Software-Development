import { useState } from 'react'

import { getAuthErrorMessage } from '@/utils/authUtils'

export function useAuthRequest(fallbackMessage: string) {
  const [isPending, setIsPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const executeAuthRequest = async (request: () => Promise<void>) => {
    try {
      setIsPending(true)
      setErrorMessage('')
      await request()
    } catch (error) {
      setErrorMessage(getAuthErrorMessage(error, fallbackMessage))
    } finally {
      setIsPending(false)
    }
  }

  return { errorMessage, executeAuthRequest, isPending }
}