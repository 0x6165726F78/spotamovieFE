import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import {
  LikedListScreen,
  LoginScreen,
  SuggestionsScreen,
  WizardScreen,
  SurveyScreen,
} from '../screens';
import colors from '../colors';

const TAB_BAR_INITAL_ROUTE = 'Suggestions';
const STACK_INITIAL_ROUTE = 'Login';

const TabBar = new TabNavigator(
  {
    Suggestions: { screen: SuggestionsScreen },
    LikedList: { screen: LikedListScreen },
  },
  {
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
  }
);

export default new StackNavigator(
  {
    Login: { screen: LoginScreen },
    Survey: { screen: SurveyScreen },
    Wizard: { screen: WizardScreen },
    Main: { screen: TabBar },
  },
  {
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
  }
);
