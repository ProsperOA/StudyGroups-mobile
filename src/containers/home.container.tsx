import * as React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../store/reducers';

interface HomeProps {
  user: any;
}

class Home extends React.Component<HomeProps, {}> {
  public render(): JSX.Element {
    if (!this.props.user) return <Text>Loading...</Text>;
    return <Text>Hello {this.props.user.first_name}</Text>
  }
}

const mapStateToProps = ({ auth: { user }}: AppState) => ({ user });

export default connect(mapStateToProps)(Home);