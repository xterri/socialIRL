import React from 'react';
import { 
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import MainScreen from './src/screens/MainScreen';
import EventDetailsScreen from './src/screens/EventDetailsScreen';
import UserProfileScreen from './src/screens/UserProfileScreen';
import AccountMainScreen from './src/screens/AccountMainScreen';
import EditAccountScreen from './src/screens/EditAccountScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import CreateEventScreen from './src/screens/CreateEventScreen';
import ChatListScreen from './src/screens/ChatListScreen';
import ChatroomScreen from './src/screens/ChatroomScreen';
import ConfirmAttendanceScreen from './src/screens/ConfirmAttendanceScreen';

// import TestScreen from './src/screens/testScreen';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,
  loginFlow: createStackNavigator({
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  }),
  // can navigate to any of the listed route screens, but the 'back' feature will only go back to 'last' screen it refers to
    // ex. navigate to Sign Up from AccountMain, if 'back' is pressed, will navigate to Sign In and not AccountMain
  mainFlow: createStackNavigator({ // either StackNavigator or createBottomTabNavigator({})
    // Test: TestScreen,
    Main: MainScreen,
    EventDetails: EventDetailsScreen,
    UserProfile: UserProfileScreen,
    // accountFlow: createStackNavigator({}), // will create 2 stack views if using a stack within a stack
    AccountMain: AccountMainScreen,
    EditAccount: EditAccountScreen,
    Settings: SettingsScreen,
    CreateEvent: CreateEventScreen,
    ChatList: ChatListScreen,
    Chatroom: ChatroomScreen,
    ConfirmAttendance: ConfirmAttendanceScreen
  }, { headerLayoutPreset: 'center' })
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <AuthProvider>
      <App ref={(navigator) => { setNavigator(navigator)}}/>
    </AuthProvider>
  );
};