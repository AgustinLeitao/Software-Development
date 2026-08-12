import { useClerk } from '@clerk/expo'
import { Button, StyleSheet, Text, View } from 'react-native'

export default function ChatsPage() {
  const { signOut } = useClerk()

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Chat</Text>
        <Button title="Log out" onPress={async () => await signOut()} />
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
})
