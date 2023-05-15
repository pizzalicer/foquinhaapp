import * as React from 'react';
import { BottomTabNavigationProp, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ScreenCamera, ScreenPerfil} from "../screens"
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { colors } from '../styles/colors';

type TabParamList ={
  Perfil: undefined
  Camera: undefined
}
type TabScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Perfil'>
export type TabTypes = {
  navigation: TabScreenNavigationProp
}

export function TabNavigation() {
  const Tab = createBottomTabNavigator<TabParamList>();
  return(
    <Tab.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary
      },
      headerTintColor: colors.white,
      tabBarActiveBackgroundColor: colors.primary,
      tabBarActiveTintColor: colors.white
    }}
    >
      <Tab.Screen name="Perfil" component={ScreenPerfil} 
      options={{
        tabBarIcon: () => (
          <Ionicons name= 'person' color={colors.white} size={24} />
          ),
      }}
      />
      <Tab.Screen name="Camera" component={ScreenCamera}
      options={{
        tabBarIcon: () => (
          <AntDesign name= 'camera' color={colors.white} size={24} />
          ),
      }}
      />
    </ Tab.Navigator>
  );
}