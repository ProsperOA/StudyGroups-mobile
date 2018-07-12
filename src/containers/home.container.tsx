import * as React  from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Drawer,
  Header,
  Text
} from 'native-base';

import globalStyles    from '../shared/styles';
import { AppState }    from '../store/reducers';
import { HeaderTitle } from '../shared/ui';

interface HomeProps {
  user: any;
}

class Home extends React.Component<HomeProps, {}> {
  public drawerRef: any;

  public render(): JSX.Element {
    return (
      <Container>
        <Header style={globalStyles.primaryBG}>
          <HeaderTitle />
        </Header>
        <Content>
          <Text>Hello {this.props.user.first_name}</Text>
        </Content>
        <Drawer
          ref={(ref: any) => this.drawerRef = ref}>
        </Drawer>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth: { user }}: AppState) => ({ user });

export default connect(mapStateToProps)(Home);