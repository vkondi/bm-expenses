import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Dimensions, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ViewContainer from '@components/ViewContainer';
import SafeAreaWrapper from '@components/SafeAreaWrapper';

import {MIRAGE, FADE_TEXT_GREY, GRAY_GAINSBORO} from '@constants/Colors';

const Dashboard = ({navigation}) => {
  // Init
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    console.log('[Dashboard] >> [init]');

    const storageKeys = await AsyncStorage.getAllKeys();
    debugger;
  };
  return (
    <SafeAreaWrapper backgroundColor={MIRAGE}>
      <ViewContainer title="Expenses" paddingHorizontal={0}>
        <></>
      </ViewContainer>
    </SafeAreaWrapper>
  );
};

const Style = StyleSheet.create({});

export default Dashboard;
