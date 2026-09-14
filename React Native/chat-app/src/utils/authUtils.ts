export function getAuthErrorMessage(error: unknown, fallbackMessage: string) {
  if (typeof error === 'object' && error !== null && 'errors' in error) {
    const errors = (error as { errors?: Array<{ longMessage?: string; message?: string }> }).errors
    if (errors?.[0]) {
      return errors[0].longMessage ?? errors[0].message ?? fallbackMessage
    }
  }

  return fallbackMessage
}