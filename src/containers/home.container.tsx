import * as React  from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

class Home extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

export default connect()(Home);