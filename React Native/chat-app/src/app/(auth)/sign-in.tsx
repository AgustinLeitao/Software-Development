import { useAuth } from '@clerk/expo'
import { useHostedAuth } from '@clerk/expo/hosted-auth'
import { makeRedirectUri } from 'expo-auth-session'
import { Link } from 'expo-router'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'

export default function SignInScreen() {
  const { isLoaded, isSignedIn } = useAuth()
  const { startHostedAuth } = useHostedAuth()
  const [isPending, setIsPending] = useState(false)

  const handleSignIn = async () => {
    try {
      setIsPending(true)
      const redirectUrl = makeRedirectUri({ path: 'chats' })

      await startHostedAuth({
        mode: 'sign-in',
        redirectUrl,
      })

    } catch (error) {
      setIsPending(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (!isSignedIn) {
        setIsPending(false)
      }
    }, [isSignedIn])
  )

  if (isPending || !isLoaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.pendingText}>Signing you in…</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign in</Text>
        <Button title="Sign in" onPress={handleSignIn} />
        <Link replace href="/(auth)/sign-up" style={styles.link}>
          Create an account
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    gap: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  pendingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4b5563',
  },
  link: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
})
