import { Link, Stack } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Page not found' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Page not found</Text>
        <Text style={styles.message}>This screen does not exist.</Text>
        <Link href="/sign-in" style={styles.link}>
          Go to sign in
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  message: {
    color: '#4b5563',
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  link: {
    color: '#2563eb',
    fontSize: 16,
    fontWeight: '600',
  },
});
