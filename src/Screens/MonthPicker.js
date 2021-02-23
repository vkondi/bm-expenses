import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';

import {DARK_BLUE, PROGRESS_BAR_GRAY, BRIGHT_ORANGE} from '@constants/Colors';
import {MONTH_PICKER_DATA} from '@constants/Data';

const MonthPicker = ({onSelect, onClose, visible, preselectedValue}) => {
  const [selectedValue, setSelectedValue] = useState(preselectedValue);
  const [shortMonthName, setShortMonthName] = useState('');

  const onMonthPickerSelect = (item) => {
    setSelectedValue(item?.value);
    setShortMonthName(item?.shortName);
  };

  const onDone = () => {
    onSelect({key: selectedValue, shortMonthName});
  };

  const onClosePress = () => {
    setSelectedValue(preselectedValue);
    onClose();
  };

  return (
    <>
      {visible ? (
        <>
          <BlurView style={Style.blurView} />

          <View style={Style.pickerViewCls}>
            <View style={Style.pickerContainer}>
              <Text style={Style.yearText}>2021</Text>

              <View style={Style.monthContCls}>
                {MONTH_PICKER_DATA.map((item, index) => {
                  return (
                    <>
                      {selectedValue === item?.value ? (
                        <TouchableOpacity
                          style={[
                            Style.monthBlockCls,
                            Style.selectedMonthBlockCls,
                          ]}
                          onPress={() => {
                            onMonthPickerSelect(item);
                          }}>
                          <Text style={Style.selectedMonthNameCls}>
                            {item.name}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={Style.monthBlockCls}
                          onPress={() => {
                            onMonthPickerSelect(item);
                          }}>
                          <Text style={Style.monthNameCls}>{item.name}</Text>
                        </TouchableOpacity>
                      )}
                    </>
                  );
                })}
              </View>

              {/* Spacer */}
              <View style={{flex: 1}} />

              <View style={{flexDirection: 'row', height: 50}}>
                {/* Close button */}
                <TouchableOpacity
                  onPress={onClosePress}
                  style={Style.closeBtnView}>
                  <Text style={Style.closeBtnText}>CLOSE</Text>
                </TouchableOpacity>

                {/* Done button */}
                <TouchableOpacity onPress={onDone} style={Style.doneBtnView}>
                  <Text style={Style.doneBtnText}>DONE</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      ) : null}
    </>
  );
};

const Style = StyleSheet.create({
  doneBtnView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: DARK_BLUE,
  },

  doneBtnText: {
    textAlign: 'center',
    color: PROGRESS_BAR_GRAY,
  },

  closeBtnView: {
    flex: 1,
    justifyContent: 'center',
  },

  closeBtnText: {
    textAlign: 'center',
  },

  monthContCls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  monthBlockCls: {
    borderWidth: 1,
    borderColor: DARK_BLUE,
    borderStyle: 'solid',
    borderRadius: 5,
    width: '30%',
    height: 30,
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
    color: DARK_BLUE,
  },

  selectedMonthNameCls: {
    color: PROGRESS_BAR_GRAY,
    fontWeight: 'bold',
  },

  pickerViewCls: {
    bottom: 0,
    elevation: 99,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,

    alignItems: 'center',
    justifyContent: 'center',
  },

  pickerContainer: {
    width: '80%',
    height: 400,
    backgroundColor: PROGRESS_BAR_GRAY,
    borderRadius: 10,
    overflow: 'hidden',
  },

  blurView: {
    bottom: 0,
    elevation: 99,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  yearText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 25,
  },
});

export default MonthPicker;
