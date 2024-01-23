import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/Login';
import Home from '../screens/Home';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import Register from '../screens/Register';
import {Icon} from '@rneui/base';
import History from '../screens/History';
import HistoryDetail from '../screens/HistoryDetail';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator();

export default function StackNavigation() {
  const {isUserLoggedIn} = useContext(AuthContext);
  console.log(isUserLoggedIn);
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="login"
        tabBarOptions={{
          activeTintColor: '#92bc2a',
        }}>
        {!isUserLoggedIn ? (
          <>
            <Tab.Screen
              name="login"
              component={Login}
              options={{
                tabBarItemStyle: {display: 'none'},
                tabBarStyle: {display: 'none'},
              }}
            />
            <Tab.Screen
              name="register"
              component={Register}
              options={{
                tabBarItemStyle: {display: 'none'},
                tabBarStyle: {display: 'none'},
              }}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name="home"
              component={Home}
              options={{
                tabBarLabel: 'Home',
                tabBarLabelStyle: {
                  fontSize: 12,
                },
                tabBarIcon: ({color, size}) => (
                  <Icon color={color} name="roofing" size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="history"
              component={History}
              options={{
                tabBarLabel: 'History',
                tabBarLabelStyle: {
                  fontSize: 12,
                },
                tabBarIcon: ({color, size}) => (
                  <Icon color={color} name="history" size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="profile"
              component={Profile}
              options={{
                tabBarLabel: 'Profile',
                tabBarLabelStyle: {
                  fontSize: 12,
                },
                tabBarIcon: ({color, size}) => (
                  <Icon color={color} name="account-circle" size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="historydetail"
              component={HistoryDetail}
              options={{
                tabBarItemStyle: {display: 'none'},
                tabBarStyle: {display: 'none'},
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
