import * as React from 'react';
import {
  Body,
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Text,
  Title
} from 'native-base';
import Profile from './profile.container';
import Courses from './courses.container';
import Account from './account.container';

export default (props: {}): JSX.Element => (
  <Container>
    <Header hasTabs>
      <Body>
        <Title>StudyGroups</Title>
      </Body>
    </Header>
    <Tabs>
      <Tab heading={<TabHeading><Text>Profile</Text></TabHeading>}>
        <Profile />
      </Tab>
      <Tab heading={<TabHeading><Text>Courses</Text></TabHeading>}>
        <Courses />
      </Tab>
      <Tab heading={<TabHeading><Text>Account</Text></TabHeading>}>
        <Account />
      </Tab>
    </Tabs>
  </Container>
);
