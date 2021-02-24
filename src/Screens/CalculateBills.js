import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SectionList,
  ScrollView,
} from 'react-native';
import numeral from 'numeral';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import SafeAreaWrapper from '@components/SafeAreaWrapper';
import ViewContainer from '@components/ViewContainer';
import HeaderBack from '@components/HeaderBack';

import {
  PROGRESS_BAR_GRAY,
  DARK_BLUE,
  JOOMLA,
  BRIGHT_ORANGE,
  DULL_ORANGE,
} from '@constants/Colors';
import {MONTH_PICKER_DATA} from '@constants/Data';
import {getCategoryIcon} from '@utilities/Utility';

const CalculateBills = ({route, navigation}) => {
  let listRef = useRef();
  const mainData = route?.params?.mainData ?? {};
  const [monthlyBudget, setMonthlyBudget] = useState('10000');
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showCalculate, setShowCalculate] = useState(false);
  const [listData, setListData] = useState(null);
  const [minBillsNum, setMinBillsNum] = useState(null);
  const [billTotal, setBillTotal] = useState(null);
  const [emptyMsg, setEmptyMsg] = useState(null);

  useEffect(() => {
    setShowCalculate(!!(monthlyBudget && selectedMonth));
    setListData(null);
    setEmptyMsg(null);
  }, [monthlyBudget, selectedMonth]);

  const onBack = () => {
    console.log('[CalculateBills] >> [onBack]');

    navigation.goBack();
  };

  const onBudgetChange = (value) => {
    console.log('[CalculateBills] >> [onBudgetChange]');

    setMonthlyBudget(value);
  };

  const onMonthSelect = (item) => {
    console.log('[CalculateBills] >> [onMonthSelect]');

    setSelectedMonth(item?.value);
  };

  const onCalculate = () => {
    console.log('[CalculateBills] >> [onCalculate]');

    const rawBudget = parseFloat(monthlyBudget);
    const tempMonthArray = mainData[selectedMonth];

    // Data availability checking
    if (!tempMonthArray || tempMonthArray?.length < 1) {
      setEmptyMsg('There are no records for this month.');
      return;
    }

    tempMonthArray.sort(
      (rec1, rec2) => parseFloat(rec2.amount) - parseFloat(rec1.amount),
    );

    const iterateObject = tempMonthArray.reduce(
      (obj, record) => {
        const recordAmount = parseFloat(record.amount);
        const sumAfterAddingRecord = recordAmount + obj.totalCount;

        if (recordAmount > rawBudget || sumAfterAddingRecord > rawBudget) {
          return {
            ...obj,
          };
        }

        // Add record in array
        obj.recordArray.push(record);

        return {
          ...obj,
          minRecCount: obj.minRecCount + 1,
          totalCount: sumAfterAddingRecord,
        };
      },
      {
        recordArray: [],
        minRecCount: 0,
        totalCount: 0,
      },
    );

    if (iterateObject.minRecCount < 1) {
      setEmptyMsg(
        'There are no set of bills that fall under your monthly budget.',
      );
      setListData(null);
      return;
    }

    setBillTotal(numeral(iterateObject.totalCount).format('0,0.00'));
    setMinBillsNum(iterateObject.minRecCount);

    massageListData(iterateObject.recordArray);
  };

  const massageListData = (data) => {
    console.log('[CalculateBills] >> [massageListData]');

    let sectionTitles = {};
    let totalExpense = 0;

    // Valid type checking
    if (!(data instanceof Array)) {
      setListData(null);
      //   setMonthTotalExpense(numeral(0).format('0,0.00'));

      return;
    }

    // Data availability checking
    if (data.length < 1) {
      setListData(null);
      //   setMonthTotalExpense(numeral(0).format('0,0.00'));

      return;
    }

    // Sort by date
    data.sort((rec1, rec2) => {
      return new Date(rec2.date) - new Date(rec1.date);
    });

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
    // setMonthTotalExpense(numeral(totalExpense).format('0,0.00'));
  };

  const renderListItem = ({item, index}) => {
    return <ListItem item={item} key={index} />;
  };

  const renderSectionHeader = ({section: {title}}) => {
    return <Text style={Style.sectionHeaderCls}>{title}</Text>;
  };

  return (
    <SafeAreaWrapper backgroundColor={JOOMLA}>
      <ViewContainer
        scrollable
        title="Plan Expense Payment"
        headerLeftComponent={<HeaderBack onPress={onBack} />}>
        <View>
          {/* Monthly Budget */}
          <Text style={Style.labelCls}>Monthly Budget</Text>
          <TextInput
            maxLength={10}
            keyboardType="numeric"
            returnKeyType="done"
            blurOnSubmit={true}
            value={monthlyBudget}
            style={Style.inputCls}
            placeholder="Enter monthly budget"
            onChangeText={onBudgetChange}
            placeholderTextColor={DARK_BLUE}
          />

          {/* Monthly Selection */}
          <Text style={Style.labelCls}>Select Month</Text>
          <View style={Style.monthContCls}>
            {MONTH_PICKER_DATA.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    Style.monthBlockCls,
                    selectedMonth === item?.value
                      ? Style.selectedMonthBlockCls
                      : {},
                  ]}
                  onPress={() => {
                    onMonthSelect(item);
                  }}>
                  <Text
                    style={
                      selectedMonth === item?.value
                        ? Style.selectedMonthNameCls
                        : Style.monthNameCls
                    }>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {showCalculate && (
            <TouchableOpacity
              style={Style.calculateBtnView}
              onPress={onCalculate}>
              <Text style={Style.calculateBtnText}>Calculate</Text>
            </TouchableOpacity>
          )}

          {emptyMsg && <Text style={Style.emptyMsgCls}>{emptyMsg}</Text>}

          {listData && (
            <>
              <Text style={Style.labelCls}>Min Bills Under Budget</Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {minBillsNum && (
                  <Text
                    style={
                      Style.detailsCls
                    }>{`${minBillsNum} bills to be paid`}</Text>
                )}

                {billTotal && <Text style={Style.detailsCls}>{billTotal}</Text>}
              </View>
              <SectionList
                style={Style.listCls}
                sections={listData}
                keyExtractor={(item, index) => `${index}`}
                renderItem={renderListItem}
                renderSectionHeader={renderSectionHeader}
              />
            </>
          )}
        </View>
      </ViewContainer>
    </SafeAreaWrapper>
  );
};

function ListItem({item}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[Style.listItemViewCls, {marginBottom: item.isLastItem ? 50 : 0}]}>
      <FontAwesomeIcon icon={item.icon} color={BRIGHT_ORANGE} size={23} />
      <Text style={Style.listItemDescription}>{item.description}</Text>
      <Text style={Style.listItemAmount}>{item.formattedAmount}</Text>
    </TouchableOpacity>
  );
}

const Style = StyleSheet.create({
  detailsCls: {
    fontSize: 16,
    color: PROGRESS_BAR_GRAY,
    lineHeight: 20,
  },

  emptyMsgCls: {
    textAlign: 'center',
    alignSelf: 'center',
    color: PROGRESS_BAR_GRAY,
    fontSize: 18,
    lineHeight: 25,
    marginTop: 20,
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

    lineHeight: 20,
    color: '#1e3c72',
  },

  listItemAmount: {},

  listCls: {
    // paddingHorizontal: 20,
  },

  calculateBtnView: {
    alignItems: 'center',
    width: '40%',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 20,
    height: 40,
    justifyContent: 'center',
    backgroundColor: PROGRESS_BAR_GRAY,
  },

  calculateBtnText: {
    color: DARK_BLUE,
    fontSize: 20,
  },

  labelCls: {
    fontSize: 20,
    color: PROGRESS_BAR_GRAY,
    marginVertical: 10,
  },

  inputCls: {
    height: 50,
    padding: 10,
    backgroundColor: PROGRESS_BAR_GRAY,
    color: DARK_BLUE,
    fontWeight: '300',
    fontSize: 17,
    width: '100%',
    marginVertical: 10,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: PROGRESS_BAR_GRAY,
    borderRadius: 10,
  },

  monthContCls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  monthBlockCls: {
    borderWidth: 1,
    borderColor: PROGRESS_BAR_GRAY,
    borderStyle: 'solid',
    borderRadius: 5,
    width: '30%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },

  selectedMonthBlockCls: {
    backgroundColor: BRIGHT_ORANGE,
    borderWidth: 1,
    borderColor: BRIGHT_ORANGE,
  },

  monthNameCls: {
    color: PROGRESS_BAR_GRAY,
  },

  selectedMonthNameCls: {
    color: PROGRESS_BAR_GRAY,
    fontWeight: 'bold',
  },
});

export default CalculateBills;
