import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Dimensions, View} from 'react-native';
import numeral from 'numeral';
import {library} from '@fortawesome/fontawesome-svg-core';
import {far} from '@fortawesome/free-regular-svg-icons';
import {fas} from '@fortawesome/free-solid-svg-icons';

import ViewContainer from '@components/ViewContainer';
import SafeAreaWrapper from '@components/SafeAreaWrapper';

import {MIRAGE, FADE_TEXT_GREY, GRAY_GAINSBORO} from '@constants/Colors';
import {CALC_TYPE_NUM, CALC_TYPE_OPR} from '@constants/Constants';

library.add(far, fas);

const App = ({navigation}) => {
  return (
    <SafeAreaWrapper backgroundColor={MIRAGE}>
      <ViewContainer title="Expenses" paddingHorizontal={0}>
        <></>
      </ViewContainer>
    </SafeAreaWrapper>
  );
};

const Style = StyleSheet.create({});

export default App;
