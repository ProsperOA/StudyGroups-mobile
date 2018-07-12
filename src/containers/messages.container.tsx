import * as React from 'react';
import {
  Container,
  Content,
  Header,
  Text
} from 'native-base';

import globalStyles    from '../shared/styles';
import { HeaderTitle } from '../shared/ui';

export default class Messages extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Container>
        <Header style={globalStyles.primaryBG}>
          <HeaderTitle title="Messages" />
        </Header>
        <Content>
          <Text>Messages</Text>
        </Content>
      </Container>
    );
  }
}