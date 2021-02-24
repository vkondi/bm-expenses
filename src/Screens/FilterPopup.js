import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {BlurView} from '@react-native-community/blur';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

import {DARK_BLUE, PROGRESS_BAR_GRAY, BRIGHT_ORANGE} from '@constants/Colors';
import {CATEGORIES} from '@constants/Data';

const FilterPopup = ({
  visible,
  preselectedFilter = null,
  onFilterApply,
  onFilterClear,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(preselectedFilter);

  useEffect(() => {
    setSelectedCategory(preselectedFilter);
  }, [preselectedFilter]);

  const onCategorySelect = (item) => {
    setSelectedCategory(item?.name);
  };

  const onApplyPress = () => {
    if (onFilterApply) onFilterApply(selectedCategory);
  };

  const onClearPress = () => {
    if (onFilterClear) onFilterClear();
  };

  return (
    <>
      {visible ? (
        <>
          <BlurView style={Style.blurView} />

          <View style={Style.popupViewCls}>
            <View style={Style.popupContainer}>
              <Text style={Style.titleText}>Category Filter</Text>

              <View style={Style.categoryContCls}>
                {CATEGORIES.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        Style.categoryBlockCls,
                        selectedCategory === item?.name
                          ? Style.selectedCategoryBlockCls
                          : {},
                      ]}
                      onPress={() => {
                        onCategorySelect(item);
                      }}>
                      <FontAwesomeIcon
                        icon={item.icon}
                        color={
                          selectedCategory === item?.name
                            ? PROGRESS_BAR_GRAY
                            : DARK_BLUE
                        }
                        size={22}
                      />

                      <Text
                        style={
                          selectedCategory === item?.name
                            ? Style.selectedCategoryNameCls
                            : Style.categoryNameCls
                        }>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Spacer */}
              <View style={{flex: 1}} />

              <View style={{flexDirection: 'row', height: 50}}>
                {/* Clear button */}
                <TouchableOpacity
                  onPress={onClearPress}
                  style={Style.clearBtnView}>
                  <Text style={Style.clearBtnText}>CLEAR</Text>
                </TouchableOpacity>

                {/* Apply button */}
                <TouchableOpacity
                  onPress={onApplyPress}
                  style={Style.applyBtnView}>
                  <Text style={Style.applyBtnText}>APPLY</Text>
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
  applyBtnView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: DARK_BLUE,
  },

  applyBtnText: {
    textAlign: 'center',
    color: PROGRESS_BAR_GRAY,
  },

  clearBtnView: {
    flex: 1,
    justifyContent: 'center',
  },

  clearBtnText: {
    textAlign: 'center',
  },

  categoryContCls: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  categoryBlockCls: {
    borderWidth: 1,
    borderColor: DARK_BLUE,
    borderStyle: 'solid',
    borderRadius: 5,
    width: '60%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,

    flexDirection: 'row',
  },

  selectedCategoryBlockCls: {
    backgroundColor: BRIGHT_ORANGE,
    borderWidth: 1,
    borderColor: BRIGHT_ORANGE,
  },

  categoryNameCls: {
    color: DARK_BLUE,
    marginLeft: 20,
  },

  selectedCategoryNameCls: {
    color: PROGRESS_BAR_GRAY,
    fontWeight: 'bold',
    marginLeft: 20,
  },

  popupViewCls: {
    bottom: 0,
    elevation: 99,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,

    alignItems: 'center',
    justifyContent: 'center',
  },

  popupContainer: {
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

  titleText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 25,
  },
});

export default FilterPopup;
