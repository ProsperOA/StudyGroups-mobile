import * as React from 'react';
import {
  Body,
  Container,
  Content,
  Header,
  Text,
  Title
} from 'native-base';

export default class Messages extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <Container>
        <Header>
          <Body>
            <Title>StudyGroups</Title>
          </Body>
        </Header>
        <Content>
          <Text>Messages</Text>
        </Content>
      </Container>

    );
  }
}