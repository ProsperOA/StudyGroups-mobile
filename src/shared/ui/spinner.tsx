import * as React                  from 'react';
import { View, ActivityIndicator } from 'react-native';

import { SECONDARY, PRIMARY } from '../styles';

export const Spinner = (): JSX.Element => (
  <View style={{flex: 1, backgroundColor: PRIMARY}}>
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={SECONDARY} />
    </View>
  </View>
);