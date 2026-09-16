import { useAuth } from '@clerk/expo';
import { Drawer } from 'expo-router/drawer';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

export default function DrawerLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <>
      <Drawer screenOptions={{ swipeEdgeWidth: 70, headerShown: false }}>
        <Drawer.Screen name="(home)" options={{ title: 'Home' }} />
      </Drawer>
    </>
  );
}
