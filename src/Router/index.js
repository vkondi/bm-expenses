import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../Screens/Dashboard';

import {DASHBOARD} from '@constants/NavigationConstants';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator initialRouteName={DASHBOARD} headerMode="none">
      <Stack.Screen name={DASHBOARD} component={Dashboard} />
    </Stack.Navigator>
  );
};

export default Router;
