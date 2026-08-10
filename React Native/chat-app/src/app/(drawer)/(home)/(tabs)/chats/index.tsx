import { useClerk } from '@clerk/expo'
import { router } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'

export default function Page() {
  const { signOut } = useClerk()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      await signOut()
      router.replace('/sign-in')
    } catch (error) {
      setIsSigningOut(false)
    }
  }

  if (isSigningOut) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text style={styles.pendingText}>Signing out…</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Chat</Text>
        <Button title="Log out" onPress={handleSignOut} />
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
  main: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
    gap: 16,
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
  pendingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#4b5563',
  },
})
