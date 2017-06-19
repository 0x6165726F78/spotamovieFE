import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scene, Router } from 'react-native-router-flux';
import Login from '../containers/Login';
import Wizard from '../components/Wizard/Wizard';
import SwiperEL from '../components/Swiper/SwiperEL';
import LikedList from '../components/LikedList/LikedList';
import Recomm from '../components/Recomm/Recomm';
import SurveyNav from '../components/Swiper/components/SurveyNav';
import ActionCreators from '../actions';
import RecLoader from '../components/RecLoader/RecLoader';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation'
import colors from '../colors/Colors'

import {
  Animated,
  StyleSheet,
  View,
  NavigationExperimental,
  Text,
  Button
} from 'react-native';

console.ignoredYellowBox = ['Warning: View.propTypes'];

import { themeManager } from 'nachos-ui'

const buttonTheme = themeManager.getStyle('Button')

const newButtonTheme = {
  ...buttonTheme,
  BUTTON_STATE_PRIMARY: '#94de45',
  BUTTON_STATE_SUCCESS: '#2f8cff',
  BUTTON_STATE_DANGER: '#ED462C'
}

themeManager.setSource('Button', () => (newButtonTheme))

class AppContainer extends Component {
  render() {
    const TAB_BAR_INITAL_ROUTE = 'SwiperEL'
    const STACK_INITIAL_ROUTE = 'Login'

    const TabBar = new TabNavigator({
      SwiperEL: { screen: SwiperEL },
      Recomm: { screen: Recomm },
      LikedList: { screen: LikedList }
    }, {
        initialRouteName: TAB_BAR_INITAL_ROUTE,
        lazy: true,
        tabBarOptions: {
          swipeEnabled: false,
          tabBarPosition: 'bottom',
          tabBarComponent: TabBarBottom,
          activeTintColor: colors.greenColor,
          inactiveTintColor: colors.darkGrayColor,
          labelStyle: {
            fontSize: 14,
          },
          style: {
            height: 60,
            paddingBottom: 4,
            backgroundColor: colors.blackColor,
            borderTopColor: colors.darkGrayColor,
            borderTopWidth: 1,
          },
        },
      })

    const MainStack = new StackNavigator({
      Login: { screen: Login },
      Wizard: { screen: Wizard },
      Main: { screen: TabBar },
    }, {
        initialRouteName: STACK_INITIAL_ROUTE,
        navigationOptions: {
          headerLeft: null,
          headerStyle: {
            backgroundColor: colors.blackColor,
            borderBottomWidth: 1,
            borderBottomColor: colors.darkGrayColor,
          },
          headerTintColor: 'white',
        },
      })



    return (
      <MainStack />
    );
  }
}


function mapStateToProps(state) {
  return {

  };
}
const mapDispatchToProps = (dispatch) => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
