import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../Screens/Dashboard';
import DetailsView from '../Screens/DetailsView';
import ChartView from '../Screens/ChartView';
import CalculateBills from '../Screens/CalculateBills';

import {
  DASHBOARD,
  DETAILS_VIEW,
  CHART_VIEW,
  CALCULATE_BILLS,
} from '@constants/NavigationConstants';

const Stack = createStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator initialRouteName={DASHBOARD} headerMode="none">
      <Stack.Screen name={DASHBOARD} component={Dashboard} />
      <Stack.Screen name={DETAILS_VIEW} component={DetailsView} />
      <Stack.Screen name={CHART_VIEW} component={ChartView} />
      <Stack.Screen name={CALCULATE_BILLS} component={CalculateBills} />
    </Stack.Navigator>
  );
};

export default Router;
