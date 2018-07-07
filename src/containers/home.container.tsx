import * as React from 'react';
import { connect } from 'react-redux';
import {
  Body,
  Container,
  Content,
  Header,
  Text,
  Title
} from 'native-base';
import { AppState } from '../store/reducers';

interface HomeProps {
  user: any;
}

class Home extends React.Component<HomeProps, {}> {
  public render(): JSX.Element {
    return (
      <Container>
        <Header>
          <Body>
            <Title>StudyGroups</Title>
          </Body>
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