import { useHostedAuth } from '@clerk/expo/hosted-auth'
import { makeRedirectUri } from 'expo-auth-session'
import { Link } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Alert, Button, Platform, StyleSheet, Text, View } from 'react-native'

export default function SignInScreen() {
  const { startHostedAuth } = useHostedAuth()
  const [isPending, setIsPending] = useState(false)

  const handleSignIn = async () => {
    if (Platform.OS === 'web') {
      alert('Authentication is only supported on mobile devices.');
      return;
    }

    try {
      setIsPending(true)
      const redirectUrl = makeRedirectUri()

      const res = await startHostedAuth({
        mode: 'sign-in',
        redirectUrl,
      })

      if (!res?.createdSessionId) {
        setIsPending(false)
      }
    } catch (error) {
      console.log(error);
      setIsPending(false)
    }
  }

  if (isPending) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.pendingText}>Signing you in…</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign in</Text>
        <Button title="Sign in" onPress={handleSignIn} />
        <Link replace href="/sign-up" style={styles.link}>
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
