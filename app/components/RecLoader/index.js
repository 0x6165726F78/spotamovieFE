import React, { Component, PropTypes } from 'react';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { Spinner } from 'nachos-ui';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import I18n from 'react-native-i18n';

const arrowIcon = (<Icon name="md-arrow-round-forward" size={30} color="white" height={20} />);

class RecLoader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerHeading}>
          <Text style={styles.heading}>{I18n.t('thankyou')}</Text>
        </View>
        <View style={styles.containerSubheading}>
          <Text style={styles.subheading}>{I18n.t('songsmovies')}</Text>
        </View>
        <View style={styles.containerLoader}>
          <Spinner color="#94de45" />
        </View>
      </View>
    );
  }
}

export default RecLoader;
