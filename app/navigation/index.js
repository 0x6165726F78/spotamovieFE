import LoginScreen from '../screens/LoginScreen'
import Wizard from '../components/Wizard'
import DiscoverScreen from '../screens/DiscoverScreen'
import LikedListScreen from '../screens/LikedListScreen'
import RecommendedScreen from '../screens/RecommendedScreen'
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation'
import colors from '../colors'

const TAB_BAR_INITAL_ROUTE = 'SwiperEL'
const STACK_INITIAL_ROUTE = 'Login'

const TabBar = new TabNavigator(
  {
    SwiperEL: { screen: DiscoverScreen },
    Recomm: { screen: RecommendedScreen },
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
)

export default new StackNavigator(
  {
    Login: { screen: LoginScreen },
    Wizard: { screen: Wizard },
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
)
