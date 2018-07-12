import * as React from 'react';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../src/store/reducers';
import enhancer from '../src/store/middlewares';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Font } from 'expo';
import { Root } from 'native-base';

import navService from './shared/navigation-service';
import Auth from './containers/auth.container';
import Home from './containers/home.container';
import User from './containers/user/user.component';
import Messages from './containers/messages.container';
import { PRIMARY, LIGHT_GRAY } from './shared/styles';
import TabIcon from './shared/ui/tab-icon';

const TabsNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: (color: any) => <TabIcon name="users" color={color} />
      }
    },
    Messages: {
      screen: Messages,
      navigationOptions: {
        tabBarIcon: (color: any) => <TabIcon name="envelope" color={color} />
      }
    },
    User: {
      screen: User,
      navigationOptions: {
        tabBarIcon: (color: any) => <TabIcon name="user" color={color} />
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false,
      activeTintColor: PRIMARY,
      inactiveTintColor: LIGHT_GRAY
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    Auth,
    Tabs: TabsNavigator
  },
  {
    initialRouteName: 'Auth',
    headerMode: 'none'
  }
);

interface MainState {
  fontLoaded: boolean;
}

class Main extends React.Component<{}, MainState> {
  public state: Readonly<MainState> = { fontLoaded: false };

  public async componentDidMount() {
    await Font.loadAsync({
      'rubik-regular': require('./assets/fonts/Rubik-Regular.ttf'),
      'rubik-medium': require('./assets/fonts/Rubik-Medium.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  public render(): boolean | JSX.Element {
    return (
      this.state.fontLoaded &&
        <AppNavigator
          ref={(navRef: any) => navService.setTopLevelNavigator(navRef)} />
    );
  }
}

const store: Store = createStore(rootReducer, enhancer);

const App = (): JSX.Element => (
  <Provider store={store}>
    <Root>
      <Main />
    </Root>
  </Provider>
);

export default App;
