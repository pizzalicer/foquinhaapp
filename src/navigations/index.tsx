import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';
import {LoginNavigation} from "./login.navigation"

export function Navigation() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
        <LoginNavigation />
    </NavigationContainer>
  );
}