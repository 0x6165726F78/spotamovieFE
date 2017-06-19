import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar } from 'react-native'
import { Spinner } from 'nachos-ui'

export default class LoadingView extends Component {
  static defaultProps = {
    title: 'LOADING SURVEY...',
  }

  render() {
    return (
      <View style={styles.containerLoader}>
        <View style={styles.titleView}>
          <Text style={styles.title}>
            {this.props.title}
          </Text>
          <Spinner color="#94de45" />
        </View>
        <StatusBar hidden={false} barStyle="light-content" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titleView: {
    flex: 0.1,
    // backgroundColor: 'pink',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  containerLoader: {
    backgroundColor: '#23222E',
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
    // backgroundColor: 'purple',
    color: 'white',
    marginBottom: 10,
  },
})
