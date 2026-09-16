import { useSignUp } from '@clerk/expo'
import { Link } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'

import { useAuthRequest } from '@/hooks/useAuthRequest'

export default function SignUpScreen() {
  const { signUp } = useSignUp()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [code, setCode] = useState('')
  const [needsVerification, setNeedsVerification] = useState(false)
  const { errorMessage, executeAuthRequest, isPending } = useAuthRequest('Unable to create your account. Check your details and try again.')

  const handleSignUp = async () => {
    if (!email.trim() || !password) {
      return;
    }

    await executeAuthRequest(async () => {
      const result = await signUp.password({
        emailAddress: email.trim(),
        password,
      })

      if (result.error) {
        throw result.error
      }

      await signUp.verifications.sendEmailCode()
      setNeedsVerification(true)
    })
  }

  const handleVerify = async () => {
    if (!code.trim()) {
      return
    }

    await executeAuthRequest(async () => {
      const result = await signUp.verifications.verifyEmailCode({ code: code.trim() })

      if (result.error) {
        throw result.error
      }

      if (signUp.status === 'complete') {
        const finalizeResult = await signUp.finalize()
        if (finalizeResult.error) {
          throw finalizeResult.error
        }
      }
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{needsVerification ? 'Check your email' : 'Create account'}</Text>
        <Text style={styles.subtitle}>
          {needsVerification ? `Enter the code sent to ${email}` : 'Start chatting with your contacts'}
        </Text>
        {!needsVerification ? (
          <>
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
              autoComplete="new-password"
              onChangeText={setPassword}
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              secureTextEntry
              style={styles.input}
              value={password}
            />
          </>
        ) : (
          <TextInput
            autoCapitalize="none"
            keyboardType="number-pad"
            onChangeText={setCode}
            placeholder="Verification code"
            placeholderTextColor="#9ca3af"
            style={styles.input}
            value={code}
          />
        )}
        {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
        <Pressable
          disabled={isPending || (needsVerification ? !code.trim() : !email.trim() || !password)}
          onPress={needsVerification ? handleVerify : handleSignUp}
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        >
          {isPending ? <ActivityIndicator color="#ffffff" /> : <Text style={styles.buttonText}>{needsVerification ? 'Verify email' : 'Sign up'}</Text>}
        </Pressable>
        {!needsVerification && (
          <Link replace href="/sign-in" style={styles.link}>
            Already have an account?
          </Link>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    gap: 12,
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
    textAlign: 'center',
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
      return errors[0].longMessage ?? errors[0].message ?? 'Unable to create your account.'
    }
  }

  return 'Unable to create your account. Check your details and try again.'
}