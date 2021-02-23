import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import SafeAreaWrapper from '@components/SafeAreaWrapper';
import ViewContainer from '@components/ViewContainer';
import HeaderBack from '@components/HeaderBack';

import {
  DARK_BLUE,
  PROGRESS_BAR_GRAY,
  BRIGHT_ORANGE,
  JOOMLA,
} from '@constants/Colors';

const DetailsView = ({route, navigation}) => {
  const year = '2021';
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [mode, setMode] = useState(null);
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);
  const [inputHeight, setInputHeight] = useState(50);

  useEffect(() => {
    init();
  }, [route]);

  useEffect(() => {
    if (mode === 'ADD') {
      setDefaultData();
    }

    if (mode === 'EDIT') {
      setExistingData();
    }
  }, [mode]);

  const init = () => {
    console.log('[DetailsView] >> [init]');

    const params = route?.params ?? {};
    const paramsMode = params?.mode;

    setMode(paramsMode);
  };

  const setDefaultData = () => {
    console.log('[DetailsView] >> [setDefaultData]');

    const params = route?.params ?? {};
    const todayDate = new Date();
    const defaultMonth = String(todayDate.getMonth() + 1).padStart(2, '0');
    const defaultDate = String(todayDate.getDate());

    setMonth(defaultMonth);
    setDate(defaultDate);
  };

  const setExistingData = () => {
    console.log('[DetailsView] >> [setExistingData]');

    const params = route?.params ?? {};
  };

  const onMonthChange = (value) => {
    console.log('[DetailsView] >> [onMonthChange]');

    setMonth(value);
  };

  const onMonthBlur = () => {
    console.log('[DetailsView] >> [onMonthBlur]');

    if (month) setMonth(String(month).padStart(2, '0'));
  };

  const onDateChange = (value) => {
    console.log('[DetailsView] >> [onMonthChange]');

    setDate(value);
  };

  const onDateBlur = () => {
    console.log('[DetailsView] >> [onDateBlur]');

    if (date) setDate(String(date).padStart(2, '0'));
  };

  const onAmountChange = (value) => {
    console.log('[DetailsView] >> [onAmountChange]');

    setAmount(value);
  };

  const onDescriptionChange = (value) => {
    console.log('[DetailsView] >> [onDescriptionChange]');

    setDescription(value);
  };

  const onContentSizeChange = (event) => {
    setInputHeight(event.nativeEvent.contentSize.height + 20);
  };

  const onBack = () => {
    console.log('[DetailsView] >> [onBack]');

    navigation.goBack();
  };

  return (
    <SafeAreaWrapper backgroundColor={JOOMLA}>
      <ViewContainer
        title="Add Expense"
        headerLeftComponent={<HeaderBack onPress={onBack} />}
        scrollable>
        <>
          <Text style={Style.labelCls}>Expense Date</Text>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 10,
              justifyContent: 'space-between',
            }}>
            {/* Year */}
            <TextInput
              editable={false}
              value={year}
              style={Style.dateInputCls}
              placeholder="YYYY"
            />

            {/* Month */}
            <TextInput
              maxLength={2}
              keyboardType="number-pad"
              returnKeyType="done"
              blurOnSubmit={true}
              value={month}
              style={Style.dateInputCls}
              placeholder="MM"
              onChangeText={onMonthChange}
              onBlur={onMonthBlur}
              placeholderTextColor={DARK_BLUE}
            />

            {/* Date */}
            <TextInput
              maxLength={2}
              keyboardType="number-pad"
              returnKeyType="done"
              blurOnSubmit={true}
              value={date}
              style={Style.dateInputCls}
              placeholder="DD"
              onChangeText={onDateChange}
              onBlur={onDateBlur}
              placeholderTextColor={DARK_BLUE}
            />
          </View>

          {/* Amount */}
          <Text style={Style.labelCls}>Amount</Text>
          <TextInput
            maxLength={10}
            keyboardType="number-pad"
            returnKeyType="done"
            blurOnSubmit={true}
            value={amount}
            style={[Style.dateInputCls, {width: '100%', marginVertical: 10}]}
            placeholder="Enter amount"
            onChangeText={onAmountChange}
            placeholderTextColor={DARK_BLUE}
          />

          {/* Description */}
          <Text style={Style.labelCls}>Description</Text>
          <TextInput
            multiline
            maxLength={80}
            returnKeyType="done"
            blurOnSubmit={true}
            value={description}
            style={[
              Style.dateInputCls,
              {
                width: '100%',
                marginVertical: 10,
                height: Math.max(50, inputHeight),
              },
            ]}
            onChangeText={onDescriptionChange}
            onContentSizeChange={onContentSizeChange}
            placeholderTextColor={DARK_BLUE}
          />
        </>
      </ViewContainer>
    </SafeAreaWrapper>
  );
};

const Style = StyleSheet.create({
  dateInputCls: {
    height: 50,
    padding: 10,
    backgroundColor: PROGRESS_BAR_GRAY,
    color: DARK_BLUE,
    width: '30%',
    fontWeight: '300',
    fontSize: 17,

    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: PROGRESS_BAR_GRAY,
    borderRadius: 10,
  },

  labelCls: {
    fontSize: 20,
    color: PROGRESS_BAR_GRAY,
    marginVertical: 10,
  },
});

export default DetailsView;
