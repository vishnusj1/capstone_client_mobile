import React from 'react';
import { LineChart, Grid } from 'react-native-svg-charts';
import { View,Text } from 'react-native';

const ChartComponent = ({ historicalData, companyName }) => {
  const data = historicalData.map(item => item.close).reverse();
  return (
    <View>
      <LineChart
        style={{ height: 200 }}
        data={data}
        svg={{ stroke: 'rgb(75, 192, 192)' }}
        contentInset={{ top: 20, bottom: 20 }}
      >
        <Grid />
      </LineChart>
    </View>
  );
};

export default ChartComponent;
