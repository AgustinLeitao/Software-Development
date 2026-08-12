import { useHostedAuth } from '@clerk/expo/hosted-auth'
import { makeRedirectUri } from 'expo-auth-session'
import { Link } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'

export default function SignUpScreen() {
  const { startHostedAuth } = useHostedAuth()
  const [isPending, setIsPending] = useState(false)

  const handleSignUp = async () => {
    try {
      setIsPending(true)
      const redirectUrl = makeRedirectUri()

      const res = await startHostedAuth({
        mode: 'sign-up',
        redirectUrl,
      })

      if (!res?.createdSessionId) {
        setIsPending(false)
      }
    } catch (error) {
      setIsPending(false)
    }
  }

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.pendingText}>Creating your account…</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create account</Text>
        <Button title="Sign up" onPress={handleSignUp} />
        <Link replace href="/(auth)/sign-in" style={styles.link}>
          Already have an account?
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
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