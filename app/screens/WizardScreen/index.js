import React, { Component, PropTypes } from 'react'
import { styles } from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'

const arrowIcon = (
  <Icon name="md-arrow-round-forward" size={30} color="white" height={20} />
)

class Wizard extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerHeading}>
          <Text style={styles.heading}>Tell us about your movie prefs</Text>
        </View>
        <View style={styles.containerSubheading}>
          <Text style={styles.subheading}>
            This app is young, so we need to create a base of movie preferences
            to detect connections with your music taste.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => this.props.navigation.navigate('Survey')}
          style={styles.containerStart}
        >
          <View style={styles.start} underlayColor="#fff">
            <Text style={styles.startText}>START SURVEY</Text>
          </View>
          <View underlayColor="#fff">
            <Text style={styles.arrowIcon}>{arrowIcon}</Text>
          </View>

        </TouchableOpacity>
      </View>
    )
  }
}

export default Wizard
