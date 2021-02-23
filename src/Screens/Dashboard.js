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

import {JOOMLA, PROGRESS_BAR_GRAY} from '@constants/Colors';
import {MAIN_EXPENSES_DATA} from '@constants/Data';
import {MAIN_DATA_KEY} from '@constants/Constants';
import {getCategoryIcon} from '@utilities/Utility';

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

const Dashboard = ({navigation}) => {
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

  // Init
  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (shortMonthKey && mainData) {
      const plainData = mainData?.[shortMonthKey] ?? [];
      massageListData(plainData);
    }
  }, [shortMonthKey, mainData]);

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

  const massageListData = (data) => {
    console.log('[Dashboard] >> [massageListData]');

    let sectionTitles = {};
    let totalExpense = 0;

    // Valid type checking
    if (!(data instanceof Array)) return;

    // Data availability checking
    if (data.length < 1) return;

    // Sort by date
    data.sort((rec1, rec2) => {
      return rec1.date - rec2.date;
    });

    // Data massaging
    data.forEach((item) => {
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

  const addExpense = () => {
    console.log('[Dashboard] >> [addExpense]');

    // TEMPORARILY USING THIS HANDLER TO CLEAR STORAGE
    clearAsyncStorage();
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
    return <ListItem item={item} key={index} />;
  };

  const renderSectionHeader = ({section: {title}}) => {
    return <Text style={Style.sectionHeaderCls}>{title}</Text>;
  };

  return (
    <SafeAreaWrapper backgroundColor={JOOMLA}>
      <>
        <Header
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

        {/* Floating Plus Icon */}
        <TouchableOpacity style={Style.addIconView} onPress={addExpense}>
          <FontAwesomeIcon icon={['fas', 'plus']} color="#2a5298" size={22} />
        </TouchableOpacity>
      </>
    </SafeAreaWrapper>
  );
};

function ListItem({item}) {
  return (
    <View style={Style.listItemViewCls}>
      <FontAwesomeIcon
        icon={item.icon}
        color="#f25c54"
        size={25}
        // style={Style.settingsIconCls}
      />
      <Text style={Style.listItemDescription}>{item.description}</Text>
      <Text style={Style.listItemAmount}>{item.formattedAmount}</Text>
    </View>
  );
}

const Style = StyleSheet.create({
  listItemViewCls: {
    flexDirection: 'row',
    marginVertical: 5,
    minHeight: 50,
    backgroundColor: PROGRESS_BAR_GRAY,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  listItemDescription: {
    flex: 1,
    marginHorizontal: 10,
    fontSize: 20,
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
    paddingHorizontal: 10,
  },

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

  sectionHeaderCls: {
    fontSize: 20,
    color: '#fca311',
    textAlign: 'right',
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
});

export default Dashboard;
