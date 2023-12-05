import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './HomeScreen';

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen,
  },
  {
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
    },
  }
);

export default createAppContainer(TabNavigator);
