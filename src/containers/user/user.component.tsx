import * as React from 'react';
import {
  Container,
  Tab,
  Tabs,
  TabHeading,
  Text
} from 'native-base';
import Profile from './profile.container';
import Courses from './courses.container';

export default (props: {}): JSX.Element => (
  <Container>
    <Tabs>
      <Tab heading={<TabHeading><Text>Profile</Text></TabHeading>}>
        <Profile />
      </Tab>
      <Tab heading={<TabHeading><Text>Courses</Text></TabHeading>}>
        <Courses />
      </Tab>
      <Tab heading={<TabHeading><Text>Account</Text></TabHeading>}>
      </Tab>
    </Tabs>
  </Container>
);
