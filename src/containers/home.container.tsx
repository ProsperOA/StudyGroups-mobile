import * as React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { AppState } from '../store/reducers';

interface HomeProps {
  currentUser: any;
}

class Home extends React.Component<HomeProps, {}> {
  public render(): JSX.Element {
    if (!this.props.currentUser) return <Text>Loading...</Text>;
    return <Text>Hello {this.props.currentUser.first_name}</Text>
  }
}

const mapStateToProps = ({ user: { currentUser }}: AppState) => ({ currentUser });

export default connect(mapStateToProps)(Home);