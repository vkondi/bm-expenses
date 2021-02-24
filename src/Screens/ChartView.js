import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

import SafeAreaWrapper from '@components/SafeAreaWrapper';
import ViewContainer from '@components/ViewContainer';
import HeaderBack from '@components/HeaderBack';

import {PROGRESS_BAR_GRAY, BRIGHT_ORANGE, JOOMLA} from '@constants/Colors';
import {CHART_YEARLY_LABEL} from '@constants/Data';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const chartHeight = (screenHeight * 60) / 100;
const chartFixedHeight = 400;
const defaultChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const ChartView = ({route, navigation}) => {
  const [chartData, setChartData] = useState(
    route?.params?.chartData ?? defaultChartData,
  );

  const onBack = () => {
    console.log('[ChartView] >> [onBack]');

    navigation.goBack();
  };

  return (
    <SafeAreaWrapper backgroundColor={JOOMLA}>
      <ViewContainer
        title="Expense Chart"
        paddingHorizontal={0}
        headerLeftComponent={<HeaderBack onPress={onBack} />}>
        <View>
          <Text
            style={{
              marginHorizontal: 30,
              textAlign: 'center',
              color: PROGRESS_BAR_GRAY,
              fontSize: 22,
              marginVertical: 10,
            }}>
            2021
          </Text>

          {chartData && (
            <LineChart
              data={{
                labels: CHART_YEARLY_LABEL,
                datasets: [
                  {
                    data: chartData,
                  },
                ],
              }}
              width={screenWidth - 2} // from react-native
              height={Math.min(chartHeight, chartFixedHeight)}
              // yAxisLabel="$"
              // yAxisSuffix="k"
              yAxisInterval={50} // optional, defaults to 1
              chartConfig={{
                backgroundColor: '#1e3c72',
                backgroundGradientFrom: '#1e3c72',
                backgroundGradientTo: '#2a5298',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => BRIGHT_ORANGE,
                labelColor: (opacity = 1) => PROGRESS_BAR_GRAY,
                style: {
                  borderRadius: 10,
                },
                propsForDots: {
                  r: '8',
                  strokeWidth: '2',
                  stroke: PROGRESS_BAR_GRAY,
                },
              }}
              bezier
              style={{
                marginVertical: 20,
                //   borderWidth: 1,
                //   borderStyle: 'solid',
                //   borderColor: PROGRESS_BAR_GRAY,
              }}
            />
          )}
        </View>
      </ViewContainer>
    </SafeAreaWrapper>
  );
};

const Style = StyleSheet.create({});

export default ChartView;
