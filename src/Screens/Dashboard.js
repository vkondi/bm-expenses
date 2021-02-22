import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import SafeAreaWrapper from '@components/SafeAreaWrapper';

import {MIRAGE, PROGRESS_BAR_GRAY} from '@constants/Colors';

const Header = ({onFilterPress, onSettingsPress, onGraphPress}) => {
  return (
    <View style={Style.headerViewCls}>
      {/* Title */}
      <Text style={Style.titleTextCls}>EXPENSES</Text>

      <View style={Style.headerSpacerCls} />

      {/* Filter Icon */}
      <TouchableOpacity onPress={onFilterPress}>
        <FontAwesomeIcon
          icon={['fas', 'filter']}
          color={PROGRESS_BAR_GRAY}
          size={22}
        />
      </TouchableOpacity>

      {/* Graph Icon */}
      <TouchableOpacity onPress={onGraphPress}>
        <FontAwesomeIcon
          icon={['fas', 'chart-pie']}
          color={PROGRESS_BAR_GRAY}
          size={22}
          style={Style.settingsIconCls}
        />
      </TouchableOpacity>

      {/* Settings Icon */}
      <TouchableOpacity onPress={onSettingsPress}>
        <FontAwesomeIcon
          icon={['fas', 'cog']}
          color={PROGRESS_BAR_GRAY}
          size={22}
          style={Style.settingsIconCls}
        />
      </TouchableOpacity>
    </View>
  );
};

const SubHeader = ({onMonthPress}) => {
  return (
    <View style={Style.subheaderViewCls}>
      <TouchableOpacity style={Style.headerMonthView} onPress={onMonthPress}>
        <Text style={Style.headerMonthText}>Feb 2021</Text>
      </TouchableOpacity>

      <View style={Style.headerSpacerCls} />
      <Text style={Style.headerTotalAmount}>150.00</Text>
      <FontAwesomeIcon
        icon={['fas', 'coins']}
        color={PROGRESS_BAR_GRAY}
        size={22}
        style={Style.settingsIconCls}
      />
    </View>
  );
};

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

  const onFilterPress = () => {
    console.log('[Dashboard] >> [onFilterPress]');
  };

  const onGraphPress = () => {
    console.log('[Dashboard] >> [onGraphPress]');
  };

  const onSettingsPress = () => {
    console.log('[Dashboard] >> [onSettingsPress]');
  };

  const onMonthPress = () => {
    console.log('[Dashboard] >> [onMonthPress]');
  };

  return (
    <SafeAreaWrapper backgroundColor={MIRAGE}>
      <>
        <Header
          onFilterPress={onFilterPress}
          onGraphPress={onGraphPress}
          onSettingsPress={onSettingsPress}
        />
        <SubHeader onMonthPress={onMonthPress} />

        <TouchableOpacity style={Style.addIconView}>
          <FontAwesomeIcon icon={['fas', 'plus']} color="#16222A" size={22} />
        </TouchableOpacity>
      </>
    </SafeAreaWrapper>
  );
};

const Style = StyleSheet.create({
  addIconView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PROGRESS_BAR_GRAY,

    height: 60,
    width: 60,
    borderRadius: 30,

    position: 'absolute',
    right: 20,
    bottom: 50,
  },

  headerViewCls: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 15,
  },

  headerSpacerCls: {
    flex: 1,
  },

  settingsIconCls: {
    marginLeft: 20,
  },

  titleTextCls: {
    color: PROGRESS_BAR_GRAY,
    fontSize: 25,
    letterSpacing: 4,
    fontWeight: 'bold',
  },

  subheaderViewCls: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    paddingHorizontal: 15,
  },

  headerMonthView: {
    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 10,
  },

  headerMonthText: {
    color: PROGRESS_BAR_GRAY,
    fontSize: 20,
    letterSpacing: 2,
  },

  headerTotalAmount: {
    color: PROGRESS_BAR_GRAY,
    fontSize: 20,
  },
});

export default Dashboard;
