import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
} from 'react-native';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import SafeAreaWrapper from '@components/SafeAreaWrapper';
import ViewContainer from '@components/ViewContainer';
import HeaderBack from '@components/HeaderBack';

import {
  DARK_BLUE,
  PROGRESS_BAR_GRAY,
  BRIGHT_ORANGE,
  JOOMLA,
  DULL_ORANGE,
} from '@constants/Colors';
import {CATEGORIES} from '@constants/Data';
import {CATG_FOOD} from '@constants/Constants';
import {DASHBOARD} from '@constants/NavigationConstants';

const DetailsView = ({route, navigation}) => {
  const year = '2021';
  const [title, setTitle] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [mode, setMode] = useState(null); // Possible values - ADD | EDIT
  const [amount, setAmount] = useState(null);
  const [description, setDescription] = useState(null);
  const [inputHeight, setInputHeight] = useState(50);
  const [selectedCategory, setSelectedCategory] = useState(CATG_FOOD);
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    init();
  }, [route]);

  useEffect(() => {
    if (mode === 'ADD') {
      setTitle('Add Expense');
      setDefaultData();
    }

    if (mode === 'EDIT') {
      setTitle('Edit Expense');
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
    const record = params?.record ?? null;

    if (record) {
      const splitShortDate = record.shortDate.split('/');

      setMonth(splitShortDate[1]);
      setDate(splitShortDate[0]);
      setAmount(record?.amount ? String(record.amount) : '');
      setDescription(record?.description ?? '');
      setSelectedCategory(record?.category);
    }
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

  //   const onContentSizeChange = (event) => {
  //     setInputHeight(event.nativeEvent.contentSize.height + 20);
  //   };

  const onCategorySelect = (value) => {
    console.log('[DetailsView] >> [onDescriptionChange]');

    setSelectedCategory(value);
  };

  const onBack = () => {
    console.log('[DetailsView] >> [onBack]');

    navigation.goBack();
  };

  const onSave = () => {
    console.log('[DetailsView] >> [onSave]');

    // Date validation
    if (!validateDate()) return;

    // Retrieve Expense data
    const formData = getFormData();

    navigation.navigate(DASHBOARD, {
      type: mode === 'ADD' ? 'ADD_EXPENSE' : 'EDIT_EXPENSE',
      record: {
        ...formData,
      },
    });
  };

  const validateDate = () => {
    console.log('[DetailsView] >> [validateDate]');

    // Date validation
    const isDateValid = moment(
      `2021/${month}/${date}`,
      'YYYY/MM/DD',
      true,
    ).isValid();
    setDateError(!isDateValid);

    return isDateValid;
  };

  const getFormData = () => {
    console.log('[DetailsView] >> [getFormData]');

    const recordID =
      mode === 'ADD' ? new Date().getTime() : route?.params?.record?.id;

    return {
      id: recordID,
      description: description ?? selectedCategory,
      category: selectedCategory,
      amount: amount ?? 0,
      date: `2021/${month}/${date}`,
      shortDate: `${date}/${month}`,
    };
  };

  const onSaveAsNew = () => {
    console.log('[DetailsView] >> [onSaveAsNew]');
  };

  const onDelete = () => {
    console.log('[DetailsView] >> [onDelete]');

    navigation.navigate(DASHBOARD, {
      type: 'DELETE_EXPENSE',
      record: {
        ...route?.params?.record,
      },
    });
  };

  return (
    <SafeAreaWrapper backgroundColor={JOOMLA}>
      <ViewContainer
        title={title}
        headerLeftComponent={<HeaderBack onPress={onBack} />}>
        <React.Fragment>
          <KeyboardAwareScrollView
            behavior={Platform.OS == 'ios' ? 'padding' : ''}
            enabled
            enableOnAndroid={true}
            showsVerticalScrollIndicator={false}
            style={{flex: 1}}>
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
            {dateError && (
              <Text style={{color: DULL_ORANGE}}>
                Please enter a valid date
              </Text>
            )}

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
              // multiline
              maxLength={40}
              returnKeyType="done"
              blurOnSubmit={true}
              value={description}
              style={[
                Style.dateInputCls,
                {
                  width: '100%',
                  marginVertical: 10,
                  // height: Math.max(50, inputHeight),
                },
              ]}
              onChangeText={onDescriptionChange}
              placeholder="Expense description"
              // onContentSizeChange={onContentSizeChange}
              placeholderTextColor={DARK_BLUE}
            />

            {/* Category */}
            <Text style={Style.labelCls}>Category</Text>
            <View style={Style.categoryViewCls}>
              {CATEGORIES.map((category, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onCategorySelect(category.name)}
                    style={[
                      Style.categoryBlock,
                      {
                        backgroundColor:
                          selectedCategory === category.name
                            ? BRIGHT_ORANGE
                            : null,
                        borderColor:
                          selectedCategory === category.name
                            ? BRIGHT_ORANGE
                            : PROGRESS_BAR_GRAY,
                        flexDirection:
                          selectedCategory === category.name
                            ? 'row-reverse'
                            : 'row',
                      },
                    ]}>
                    <FontAwesomeIcon
                      icon={category.icon}
                      color={PROGRESS_BAR_GRAY}
                      size={22}
                    />
                    <View style={{width: 20}} />
                    <Text style={Style.categoryText}>{category.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </KeyboardAwareScrollView>

          {/* Bottom button container */}
          <View style={Style.btnContainer}>
            {mode === 'EDIT' && (
              <View style={Style.btnContainerTop}>
                {/* Delete button */}
                <TouchableOpacity
                  onPress={onDelete}
                  style={[
                    Style.btnViewCls,
                    {
                      flex: 1,
                    },
                  ]}>
                  <Text style={Style.btnTextCls}>DELETE</Text>
                </TouchableOpacity>

                {/* Save As New Button */}
                {/* <TouchableOpacity
                onPress={onSaveAsNew}
                style={[
                  Style.btnViewCls,
                  {
                    flex: 1,
                    borderLeftWidth: 0.5,
                    borderStyle: 'solid',
                    borderColor: DARK_BLUE,
                  },
                ]}>
                <Text style={Style.btnTextCls}>SAVE AS NEW</Text>
              </TouchableOpacity> */}
              </View>
            )}

            {/* Save Button */}
            <TouchableOpacity onPress={onSave} style={Style.btnViewCls}>
              <Text style={Style.btnTextCls}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </React.Fragment>
      </ViewContainer>
    </SafeAreaWrapper>
  );
};

const Style = StyleSheet.create({
  btnContainer: {
    backgroundColor: PROGRESS_BAR_GRAY,
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },

  btnContainerTop: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: DARK_BLUE,
  },

  btnViewCls: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnTextCls: {
    textAlign: 'center',
    fontWeight: '500',
    color: DARK_BLUE,
  },

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

  categoryViewCls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  categoryBlock: {
    width: '48%',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 10,
    height: 40,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  categoryText: {
    color: PROGRESS_BAR_GRAY,
    fontSize: 18,
  },
});

export default DetailsView;
