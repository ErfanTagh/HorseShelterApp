import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dashboard } from './src/components/Dashboard';
import { HorseRoster } from './src/components/HorseRoster';
import { HorseProfile } from './src/components/HorseProfile';
import { HealthRecords } from './src/components/HealthRecords';
import { FeedingSchedule } from './src/components/FeedingSchedule';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
        },
        headerTintColor: '#111827',
        tabBarActiveTintColor: '#059669',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#e5e7eb',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="home" size={size} color={color} />,
          headerTitle: 'Equine Shelter Manager',
        }}
      />
      <Tab.Screen
        name="Roster"
        component={HorseRoster}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="list" size={size} color={color} />,
          headerTitle: 'Horse Roster',
        }}
      />
      <Tab.Screen
        name="Health"
        component={HealthRecords}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="favorite" size={size} color={color} />,
          headerTitle: 'Health Records',
        }}
      />
      <Tab.Screen
        name="Feeding"
        component={FeedingSchedule}
        options={{
          tabBarIcon: ({ color, size }) => <MaterialIcons name="event" size={size} color={color} />,
          headerTitle: 'Feeding Schedule',
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HorseProfile"
          component={HorseProfile}
          options={{
            headerTitle: 'Horse Profile',
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

