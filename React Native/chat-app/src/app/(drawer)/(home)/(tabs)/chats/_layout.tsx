import { Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: 'Chats',
            headerRight: () => (
              <Pressable
                onPress={() => { }}
                style={{ marginRight: 12 }}
              >
                <Ionicons name="person-add" size={24} color="#2563eb" />
              </Pressable>
            ),
          }}
        />
      </Stack>
    </>
  );
}
