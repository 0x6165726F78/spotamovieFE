import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { Spinner } from 'nachos-ui';
import colors from '../colors';
const { lightGreenColor, backgroundColor } = colors;

export default function LoadingView({ title }) {
  return (
    <View style={styles.containerLoader}>
      <View style={styles.titleView}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Spinner color={lightGreenColor} />
      </View>
      <StatusBar hidden={false} barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  titleView: {
    flex: 0.1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  containerLoader: {
    backgroundColor: backgroundColor,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Raleway-Bold',
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    marginBottom: 10,
  },
});
