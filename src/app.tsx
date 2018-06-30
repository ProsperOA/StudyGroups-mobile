import * as React from 'react';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../src/store/reducers';
import enhancer from '../src/store/middlewares';
import { createStackNavigator } from 'react-navigation';
import { Font } from 'expo';
import { Root } from 'native-base';

import Auth from './containers/auth.container';
import Home from './components/home.component';

const RootStack = createStackNavigator(
  {
    Auth,
    Home
  },
  { initialRouteName: 'Auth' }
);

interface RootState {
  fontLoaded: boolean;
}

class Main extends React.Component<{}, RootState> {
  public state: Readonly<RootState> = { fontLoaded: false };

  public async componentDidMount() {
    await Font.loadAsync({
      'rubik-regular': require('./assets/fonts/Rubik-Regular.ttf'),
      'rubik-medium': require('./assets/fonts/Rubik-Medium.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  public render(): boolean | JSX.Element {
    return this.state.fontLoaded && <RootStack />;
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
