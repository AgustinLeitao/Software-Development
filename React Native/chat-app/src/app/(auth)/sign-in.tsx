import { useSignIn } from '@clerk/expo'
import { Link } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

export default function SignInScreen() {
  const { signIn } = useSignIn()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPending, setIsPending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSignIn = async () => {
    if (!email.trim() || !password) {
      return;
    }

    try {
      setIsPending(true)
      setErrorMessage('')
      const result = await signIn.password({
        identifier: email.trim(),
        password,
      })

      if (result.error) {
        throw result.error
      }

      if (signIn.status === 'complete') {
        const finalizeResult = await signIn.finalize()
        if (finalizeResult.error) {
          throw finalizeResult.error
        }
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error))
    } finally {
      setIsPending(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Sign in</Text>
        <Text style={styles.subtitle}>Welcome back to your conversations</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          onChangeText={setEmail}
          placeholder="Email address"
          placeholderTextColor="#9ca3af"
          style={styles.input}
          value={email}
        />
        <TextInput
          autoCapitalize="none"
          autoComplete="password"
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#9ca3af"
          secureTextEntry
          style={styles.input}
          value={password}
        />
        {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        <Pressable
          disabled={isPending || !email.trim() || !password}
          onPress={handleSignIn}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          {isPending ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>Sign in</Text>}
        </Pressable>
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
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    gap: 14,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#4b5563',
    fontSize: 15,
    marginBottom: 6,
  },
  input: {
    borderColor: '#d1d5db',
    borderRadius: 10,
    borderWidth: 1,
    color: '#111827',
    fontSize: 16,
    height: 48,
    paddingHorizontal: 14,
    width: '100%',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    width: '100%',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  error: {
    color: '#dc2626',
    fontSize: 14,
    textAlign: 'center',
  },
  link: {
    color: '#2563eb',
    textDecorationLine: 'underline',
  },
})

function getErrorMessage(error: unknown) {
  if (typeof error === 'object' && error !== null && 'errors' in error) {
    const errors = (error as { errors?: Array<{ longMessage?: string; message?: string }> }).errors
    if (errors?.[0]) {
      return errors[0].longMessage ?? errors[0].message ?? 'Unable to sign in.'
    }
  }

  return 'Unable to sign in. Check your details and try again.'
}
