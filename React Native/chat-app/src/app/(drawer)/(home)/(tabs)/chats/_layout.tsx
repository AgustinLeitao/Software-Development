import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';

export default function ChatsLayout() {
  const router = useRouter();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Chats',
            headerRight: () => (
              <Pressable
                onPress={() => router.push('/chats/new' as any)}
                style={{ marginRight: 12 }}
                hitSlop={8}
              >
                <Ionicons name="person-add" size={24} color="#2563eb" />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="new"
          options={{
            title: 'Select Contact',
            headerBackTitle: 'Chats',
          }}
        />
      </Stack>
    </>
  );
}
