import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../Screens/Dashboard';
import DetailsView from '../Screens/DetailsView';

import {DASHBOARD, DETAILS_VIEW} from '@constants/NavigationConstants';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator initialRouteName={DASHBOARD} headerMode="none">
      <Stack.Screen name={DASHBOARD} component={Dashboard} />
      <Stack.Screen name={DETAILS_VIEW} component={DetailsView} />
    </Stack.Navigator>
  );
};

export default Router;
