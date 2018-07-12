import * as React from 'react';
import {
  Container,
  Content,
  Header,
  Text
} from 'native-base';
import HeaderTitle from '../shared/ui/header-title';

export default class Messages extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Container>
        <Header>
          <HeaderTitle title="Messages" />
        </Header>
        <Content>
          <Text>Messages</Text>
        </Content>
      </Container>

    );
  }
}