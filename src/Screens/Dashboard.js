import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import numeral from 'numeral';

import SafeAreaWrapper from '@components/SafeAreaWrapper';
import MonthPicker from './MonthPicker';
import FilterPopup from './FilterPopup';

import {
  JOOMLA,
  PROGRESS_BAR_GRAY,
  BRIGHT_ORANGE,
  DULL_ORANGE,
} from '@constants/Colors';
import {MAIN_EXPENSES_DATA} from '@constants/Data';
import {MAIN_DATA_KEY} from '@constants/Constants';
import {getCategoryIcon} from '@utilities/Utility';
import {DETAILS_VIEW, CHART_VIEW} from '@constants/NavigationConstants';

const Header = ({
  filterValue,
  onFilterPress,
  onSettingsPress,
  onGraphPress,
}) => {
  return (
    <View style={Style.headerViewCls}>
      {/* Title */}
      <Text style={Style.titleTextCls}>EXPENSES</Text>

      <View style={Style.headerSpacerCls} />

      {/* Filter Icon */}
      <TouchableOpacity onPress={onFilterPress}>
        <FontAwesomeIcon
          icon={['fas', 'filter']}
          color={filterValue ? DULL_ORANGE : PROGRESS_BAR_GRAY}
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

const SubHeader = ({monthName, totalAmount, onMonthPress}) => {
  return (
    <View style={Style.subheaderViewCls}>
      <TouchableOpacity style={Style.headerMonthView} onPress={onMonthPress}>
        <Text style={Style.headerMonthText}>{`${monthName} 2021`}</Text>
      </TouchableOpacity>

      <View style={Style.headerSpacerCls} />

      {totalAmount && (
        <>
          <Text style={Style.headerTotalAmount}>{totalAmount}</Text>
          <FontAwesomeIcon
            icon={['fas', 'coins']}
            color={PROGRESS_BAR_GRAY}
            size={22}
            style={Style.settingsIconCls}
          />
        </>
      )}
    </View>
  );
};

function EmptyListView() {
  return (
    <View style={Style.emptyListViewCls}>
      <Text style={Style.emptyListText}>No records found for this month.</Text>
    </View>
  );
}

const Dashboard = ({navigation, route}) => {
  const currentShortMonth = new Date().toLocaleString('default', {
    month: 'short',
  });
  const [mainData, setMainData] = useState(null);
  const [listData, setListData] = useState(null);
  const [shortMonth, setShortMonth] = useState(currentShortMonth);
  const [shortMonthKey, setShortMonthKey] = useState(
    currentShortMonth.toUpperCase(),
  );
  const [monthTotalExpense, setMonthTotalExpense] = useState(null);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showFilterPopup, setShowFilterPopup] = useState(false);
  const [filterValue, setFilterValue] = useState(null);

  // Init
  useEffect(() => {
    init();
  }, []);

  // Handler to receive updated navigation parameters
  useEffect(() => {
    const params = route?.params ?? {};
    const type = params?.type ?? null;
    const record = params?.record ?? null;

    switch (type) {
      case 'ADD_EXPENSE':
        if (record) addNewExpense(record);
        break;
      case 'EDIT_EXPENSE':
        if (record) editExpense(record);
        break;
      case 'DELETE_EXPENSE':
        if (record) deleteExpense(record);
        break;
      default:
        break;
    }
  }, [route?.params]);

  // To dynamically change list data based on selected month
  useEffect(() => {
    if (shortMonthKey && mainData) {
      console.log('[Dashboard] >> Main Data OR Month OR Filter Changed');

      const plainData = mainData?.[shortMonthKey] ?? [];
      massageListData(plainData);
    }
  }, [shortMonthKey, mainData, filterValue]);

  const init = async () => {
    console.log('[Dashboard] >> [init]');

    try {
      const storageKeys = await AsyncStorage.getAllKeys();
      if (storageKeys?.length > 0) {
        const storageMainData = await AsyncStorage.getItem(MAIN_DATA_KEY);
        if (!storageMainData) return;

        const parsedMainData = JSON.parse(storageMainData);
        if (parsedMainData) setMainData(parsedMainData);
      } else {
        setInitialStorageData();
      }
    } catch (error) {
      console.log('[Dashboard][init] >> Exception: ', error);
    }
  };

  const setInitialStorageData = async () => {
    console.log('[Dashboard] >> [setInitialStorageData]');

    try {
      await AsyncStorage.setItem(
        MAIN_DATA_KEY,
        JSON.stringify(MAIN_EXPENSES_DATA),
      );

      //   Once inital data is set, call init to populate data
      init();
    } catch (error) {
      console.log('[Dashboard][setInitialStorageData] >> Exception: ', error);
    }
  };

  const updateMainData = async (updatedMainData) => {
    console.log('[Dashboard] >> [updateMainData]');

    try {
      setMainData(updatedMainData);

      await AsyncStorage.setItem(
        MAIN_DATA_KEY,
        JSON.stringify(updatedMainData),
      );
    } catch (error) {
      console.log('[Dashboard][updateMainData] >> Exception: ', error);
    }
  };

  const massageListData = (data) => {
    console.log('[Dashboard] >> [massageListData]');

    let sectionTitles = {};
    let totalExpense = 0;

    // Valid type checking
    if (!(data instanceof Array)) {
      setListData(null);
      setMonthTotalExpense(numeral(0).format('0,0.00'));

      return;
    }

    // Data availability checking
    if (data.length < 1) {
      setListData(null);
      setMonthTotalExpense(numeral(0).format('0,0.00'));

      return;
    }

    // Sort by date
    data.sort((rec1, rec2) => {
      return new Date(rec2.date) - new Date(rec1.date);
    });

    // Check if any filtr is applied
    if (filterValue) {
      data = data.filter((rec) => rec.category === filterValue);
    }

    // Data massaging
    data.forEach((item, index) => {
      const date = new Date(item.date);
      const expDate = date.getDate();
      const expMonth = date.getMonth() + 1;
      const amount = parseFloat(item?.amount ?? 0);
      const icon = getCategoryIcon(item.category);
      const title = `${expDate}/${String(expMonth).padStart(2, '0')}`;

      totalExpense += amount;

      if (!sectionTitles.hasOwnProperty(title)) {
        sectionTitles[title] = [];
      }

      sectionTitles[title].push({
        ...item,
        shortDate: title,
        icon,
        formattedAmount: numeral(amount).format('0,0.00'),
        isFirstItem: index === 0,
        isLastItem: data.length - 1 === index,
      });
    });

    // Extract title keys
    const titleKeys = Object.keys(sectionTitles);

    // Construct final list data
    const finalListData = titleKeys.map((title) => {
      return {
        title,
        data: sectionTitles[title],
      };
    });

    setListData(finalListData);
    setMonthTotalExpense(numeral(totalExpense).format('0,0.00'));
  };

  const addNewExpense = (record) => {
    console.log('[Dashboard] >> [addNewExpense]');

    let tempMainData = mainData;
    const recordDate = record?.date ?? '';
    const recordShortMonth = new Date(recordDate).toLocaleString('default', {
      month: 'short',
    });
    const recordShortMonthKey = recordShortMonth.toUpperCase();

    tempMainData[recordShortMonthKey].push(record);

    // If new record is added in current selected month, then update the list
    if (recordShortMonthKey === shortMonthKey)
      massageListData(tempMainData[recordShortMonthKey]);

    // Call method to update main data in state and storage
    updateMainData(tempMainData);
  };

  const editExpense = (record) => {
    console.log('[Dashboard] >> [editExpense]');

    let tempMainData = mainData;
    const recordDate = record?.date ?? '';
    const recordShortMonth = new Date(recordDate).toLocaleString('default', {
      month: 'short',
    });
    const recordShortMonthKey = recordShortMonth.toUpperCase();

    // Iterate over and update the modified record
    tempMainData[recordShortMonthKey] = tempMainData[recordShortMonthKey].map(
      (item) => {
        if (item.id == record.id) {
          // Return the record with updated values
          return {
            ...item,
            description: record?.description,
            category: record?.category,
            amount: record?.amount,
            date: record?.date,
            shortDate: record?.shortDate,
          };
        } else {
          return item;
        }
      },
    );

    // If new record is added in current selected month, then update the list
    if (recordShortMonthKey === shortMonthKey)
      massageListData(tempMainData[recordShortMonthKey]);

    // Call method to update main data in state and storage
    updateMainData(tempMainData);
  };

  const deleteExpense = (record) => {
    console.log('[Dashboard] >> [deleteExpense]');

    let tempMainData = mainData;
    const recordDate = record?.date ?? '';
    const recordShortMonth = new Date(recordDate).toLocaleString('default', {
      month: 'short',
    });
    const recordShortMonthKey = recordShortMonth.toUpperCase();

    // Iterate over and filter out the deleted record
    tempMainData[recordShortMonthKey] = tempMainData[
      recordShortMonthKey
    ].filter((item) => item.id != record.id);

    // If new record is added in current selected month, then update the list
    if (recordShortMonthKey === shortMonthKey)
      massageListData(tempMainData[recordShortMonthKey]);

    // Call method to update main data in state and storage
    updateMainData(tempMainData);
  };

  const onFilterPress = () => {
    console.log('[Dashboard] >> [onFilterPress]');

    setShowFilterPopup(true);
  };

  const onFilterApply = (value) => {
    console.log('[Dashboard] >> [onFilterApply]');

    setFilterValue(value);
    setShowFilterPopup(false);
  };

  const onFilterClear = () => {
    console.log('[Dashboard] >> [onFilterClear]');

    setFilterValue(null);
    setShowFilterPopup(false);
  };

  const onGraphPress = () => {
    console.log('[Dashboard] >> [onGraphPress]');

    navigation.navigate(CHART_VIEW);
  };

  const onSettingsPress = () => {
    console.log('[Dashboard] >> [onSettingsPress]');
  };

  const onMonthPress = () => {
    console.log('[Dashboard] >> [onMonthPress]');

    setShowMonthPicker(true);
  };

  const onMonthPickerSelect = ({key, shortMonthName}) => {
    console.log('[Dashboard] >> [onMonthPickerSelect]');

    setShowMonthPicker(false);

    setShortMonthKey(key);
    setShortMonth(shortMonthName);
  };

  const onMonthPickerClose = () => {
    console.log('[Dashboard] >> [onMonthPickerClose]');

    setShowMonthPicker(false);
  };

  const addExpense = () => {
    console.log('[Dashboard] >> [addExpense]');

    navigation.navigate(DETAILS_VIEW, {
      shortMonthKey,
      mode: 'ADD',
    });

    // TEMPORARILY USING THIS HANDLER TO CLEAR STORAGE
    // clearAsyncStorage();
  };

  const clearAsyncStorage = async () => {
    console.log('[Dashboard] >> [clearAsyncStorage]');

    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.log('[Dashboard][clearAsyncStorage] >> Exception:', error);
    }
  };

  const renderListItem = ({item, index}) => {
    return <ListItem item={item} key={index} onPress={onExpenseItemPress} />;
  };

  const onExpenseItemPress = (item) => {
    console.log('[Dashboard] >> [onExpenseItemPress]');

    navigation.navigate(DETAILS_VIEW, {
      shortMonthKey,
      mode: 'EDIT',
      record: item,
    });
  };

  const renderSectionHeader = ({section: {title}}) => {
    return <Text style={Style.sectionHeaderCls}>{title}</Text>;
  };

  return (
    <SafeAreaWrapper backgroundColor={JOOMLA}>
      <>
        <Header
          filterValue={filterValue}
          onFilterPress={onFilterPress}
          onGraphPress={onGraphPress}
          onSettingsPress={onSettingsPress}
        />
        <SubHeader
          monthName={shortMonth}
          onMonthPress={onMonthPress}
          totalAmount={monthTotalExpense}
        />

        {/* Expenses List */}
        {listData ? (
          <SectionList
            style={Style.listCls}
            sections={listData}
            keyExtractor={(item, index) => `${index}`}
            renderItem={renderListItem}
            renderSectionHeader={renderSectionHeader}
          />
        ) : (
          <EmptyListView />
        )}

        {/* Month selection picker */}
        <MonthPicker
          visible={showMonthPicker}
          preselectedValue={shortMonthKey}
          onSelect={onMonthPickerSelect}
          onClose={onMonthPickerClose}
        />

        <FilterPopup
          visible={showFilterPopup}
          preselectedFilter={filterValue}
          onFilterApply={onFilterApply}
          onFilterClear={onFilterClear}
        />

        {/* Floating Plus Icon */}
        {!showMonthPicker && !showFilterPopup && (
          <TouchableOpacity style={Style.addIconView} onPress={addExpense}>
            <FontAwesomeIcon icon={['fas', 'plus']} color="#2a5298" size={22} />
          </TouchableOpacity>
        )}
      </>
    </SafeAreaWrapper>
  );
};

function ListItem({item, onPress}) {
  const onItemPress = () => {
    if (onPress) onPress(item);
  };
  return (
    <TouchableOpacity
      onPress={onItemPress}
      activeOpacity={0.9}
      style={[Style.listItemViewCls, {marginBottom: item.isLastItem ? 50 : 0}]}>
      <FontAwesomeIcon icon={item.icon} color={BRIGHT_ORANGE} size={23} />
      <Text style={Style.listItemDescription}>{item.description}</Text>
      <Text style={Style.listItemAmount}>{item.formattedAmount}</Text>
    </TouchableOpacity>
  );
}

const Style = StyleSheet.create({
  listItemViewCls: {
    flexDirection: 'row',
    marginVertical: 5,
    minHeight: 60,
    backgroundColor: PROGRESS_BAR_GRAY,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  listItemDescription: {
    flex: 1,
    marginHorizontal: 10,
    // fontSize: 20,
    lineHeight: 20,
    color: '#1e3c72',
  },

  listItemAmount: {},

  emptyListViewCls: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '50%',
    paddingHorizontal: 20,
  },

  emptyListText: {
    color: PROGRESS_BAR_GRAY,
    fontSize: 20,
  },

  listCls: {
    paddingHorizontal: 20,
  },

  addIconView: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DULL_ORANGE,

    height: 60,
    width: 60,
    borderRadius: 30,

    position: 'absolute',
    right: 20,
    bottom: 30,
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

  sectionHeaderCls: {
    fontSize: 18,
    lineHeight: 25,
    color: DULL_ORANGE,
    textAlign: 'right',
    backgroundColor: 'transparent',
    paddingTop: 10,
    fontWeight: '600',
    letterSpacing: 2,
  },
});

export default Dashboard;
