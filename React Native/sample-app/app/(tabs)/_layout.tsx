import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import ExploreScreen from './explore';
import HomeScreen from './index';
import PracticeScreen from './practice';

const Drawer = createDrawerNavigator();

export default function DrawerLayout() {
  const colorScheme = useColorScheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Drawer.Screen
        name="index"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Drawer.Screen
        name="explore"
        component={ExploreScreen}
        options={{ title: 'Explore' }}
      />
      <Drawer.Screen
        name="practice"
        component={PracticeScreen}
        options={{ title: 'Practice' }}
      />
    </Drawer.Navigator>
  );
}
