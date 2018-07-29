import * as React      from 'react';
import { createStore } from 'redux';
import { Font }        from 'expo';
import { Provider }    from 'react-redux';
import { Root }        from 'native-base';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import Auth                    from './containers/auth.container';
import Home                    from './containers/home.container';
import SearchStudyGroups       from './containers/study-groups/search-study-groups.container';
import Messages                from './containers/messages.container';
import navService              from './shared/services/navigation.service';
import User                    from './containers/user/user.component';
import enhancer                from './store/middlewares';
import rootReducer             from './store/reducers';
import { PRIMARY, LIGHT_GRAY } from './shared/styles';
import { TabIcon             } from './shared/ui/tab-icon';

const TabsNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: (color: any) => (
          <TabIcon
            type="FontAwesome"
            name="home"
            color={color}
            size={30} />
        )
      }
    },
    SearchStudyGroups: {
      screen: SearchStudyGroups,
      navigationOptions: {
        tabBarIcon: (color: any) => (
          <TabIcon
            type="FontAwesome"
            name="search"
            color={color}
            size={25} />
        )
      }
    },
    Messages: {
      screen: Messages,
      navigationOptions: {
        tabBarIcon: (color: any) => (
          <TabIcon
            type="Entypo"
            name="message"
            color={color}
            size={30} />
        )
      }
    },
    User: {
      screen: User,
      navigationOptions: {
        tabBarIcon: (color: any) => (
          <TabIcon
            type="FontAwesome"
            name="user"
            color={color}
            size={25} />
        )
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

const store = createStore(rootReducer, enhancer);

const App = (): JSX.Element => (
  <Provider store={store}>
    <Root>
      <Main />
    </Root>
  </Provider>
);

export default App;
