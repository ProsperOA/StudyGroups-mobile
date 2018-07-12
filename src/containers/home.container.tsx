import * as React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Header,
  Text
} from 'native-base';
import { AppState } from '../store/reducers';
import HeaderTitle from '../shared/ui/header-title';

interface HomeProps {
  user: any;
}

class Home extends React.Component<HomeProps, {}> {
  public render(): JSX.Element {
    return (
      <Container>
        <Header>
          <HeaderTitle />
        </Header>
        <Content>
          <Text>Hello {this.props.user.first_name}</Text>
        </Content>
      </Container>

    );
  }
}

const mapStateToProps = ({ auth: { user }}: AppState) => ({ user });

export default connect(mapStateToProps)(Home);