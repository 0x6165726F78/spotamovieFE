import React, { Component, PropTypes } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import colors from '../colors';
import I18n from 'react-native-i18n';

const { darkGreenColor, backgroundColor } = colors;

export default class Wizard extends Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerHeading}>
          <Text style={styles.heading}>{I18n.t('tellUS')}</Text>
        </View>
        <View style={styles.containerSubheading}>
          <Text style={styles.subheading}>
            {I18n.t('appYoung')}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.props.navigation.navigate('Survey')}
          style={styles.containerStart}
        >
          <View style={styles.start} underlayColor="#fff">
            <Text style={styles.startText}>{I18n.t('startWizard')}</Text>
          </View>
          <View underlayColor="#fff">
            <Text style={styles.arrowIcon}>
              <Icon
                name="md-arrow-round-forward"
                size={30}
                color="white"
                height={20}
              />
            </Text>
          </View>

        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: backgroundColor,
    flex: 1,
    flexDirection: 'column',
  },
  containerHeading: {
    marginTop: 40,
    paddingLeft: 13,
    flex: 0.2,
  },
  heading: {
    fontFamily: 'Raleway-Medium',
    fontSize: 38,
    color: 'white',
  },
  containerSubheading: {
    paddingLeft: 13,
    paddingRight: 13,
    flex: 0.6,
  },
  subheading: {
    color: 'white',
    fontFamily: 'Raleway-Medium',
    fontSize: 16,
  },
  containerStart: {
    flex: 0.1,
    backgroundColor: darkGreenColor,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  start: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: darkGreenColor,
    alignSelf: 'stretch',
    padding: 20,
  },
  startText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
  },
  arrowIcon: {
    marginTop: 15,
  },
});
