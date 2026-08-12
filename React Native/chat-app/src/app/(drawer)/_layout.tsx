import { Drawer } from 'expo-router/drawer';

export default function DrawerLayout() {
  return (
    <>
      <Drawer screenOptions={{ swipeEdgeWidth: 70, headerShown: false }}>
        <Drawer.Screen name="(home)" options={{ title: 'Home' }} />
        <Drawer.Screen name="about" options={{ title: 'About' }} />
      </Drawer>
    </>
  );
}
