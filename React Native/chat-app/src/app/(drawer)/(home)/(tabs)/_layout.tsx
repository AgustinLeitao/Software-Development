import { Tabs } from 'expo-router';

export default function RootLayout() {
  return (
    <>
      <Tabs screenOptions={{headerShown: false}}>
        <Tabs.Screen name="chats" options={{ title: 'Chat' }} />
        <Tabs.Screen name="settings" options={{ title: 'Settings' }} />
        <Tabs.Screen name="search" options={{ title: 'Search' }} />
      </Tabs>
    </>
  );
}
