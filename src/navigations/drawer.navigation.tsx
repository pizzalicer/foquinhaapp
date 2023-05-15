import * as React from 'react';
import { DrawerNavigationProp, createDrawerNavigator } from '@react-navigation/drawer';
import {ScreenPerfil, ScreenCamera} from "../screens"
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { colors } from '../styles/colors';

type DrawerParamList ={
  Perfil: undefined
  Camera: undefined
}
type DrawerScreenNavigationProp = DrawerNavigationProp<DrawerParamList, 'Perfil'>
export type DrawerTypes = {
  navigation: DrawerScreenNavigationProp
}

export function DrawerNavigation() {
  const Drawer = createDrawerNavigator<DrawerParamList>();
  return(
    <Drawer.Navigator screenOptions={{
      drawerStyle:{
        backgroundColor: colors.primary
      },
      drawerActiveTintColor: colors.white
    }}>
      <Drawer.Screen name="Perfil" component={ScreenPerfil} 
      options={{
        drawerIcon: () => (
          <Ionicons name='person' size={24} color={colors.white} />
        )
      }} 
      />
      <Drawer.Screen name='Camera' component={ScreenCamera}
        options={{
          drawerIcon: () => (
            <AntDesign name= 'camera' size={24} color={colors.white}/>
          )
        }}
        />
    </Drawer.Navigator>
  );
}