import * as React from 'react';
import { createStackNavigator } from 'react-navigation';

import Auth from './containers/auth.container';

const RootStack = createStackNavigator(
  { Auth },
  { initialRouteName: 'Auth' }
);

const App: React.SFC<{}> = (props: {}): JSX.Element => <RootStack />;

export default App;
