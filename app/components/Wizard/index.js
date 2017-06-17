import React, { Component, PropTypes } from 'react';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  StatusBar
} from 'react-native';

import I18n from 'react-native-i18n';

const arrowIcon = (<Icon name="md-arrow-round-forward" size={30} color="white" height={20} />);

class Wizard extends Component {
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
          <Text style={styles.subheading}>{I18n.t('appYoung')}</Text>
        </View>
        <View style={styles.containerSkip}>
          <TouchableHighlight
            style={styles.skipButton}
            onPress={() => this.props.navigation.navigate('Recomm')}
            underlayColor='#23222E'>
            <Text style={styles.skipText}>{I18n.t('skipIt')}</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.containerStart}>
          <TouchableHighlight
            style={styles.start}
            onPress={() => this.props.navigation.navigate('SwiperEL')}
            underlayColor='#fff'>
            <Text style={styles.startText}>{I18n.t('startWizard')}</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('SwiperEL')}
            underlayColor='#fff'>
            <Text style={styles.arrowIcon}>{arrowIcon}</Text>
          </TouchableHighlight>
        </View>

        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

export default Wizard;
