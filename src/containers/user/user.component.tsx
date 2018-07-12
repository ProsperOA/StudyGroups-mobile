import * as React from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Tab,
  Tabs
} from 'native-base';
import Profile from './profile.container';
import Courses from './courses.container';
import Account from './account.container';
import globalStyles, { DARK_GRAY, PRIMARY } from '../../shared/styles';
import HeaderTitle from '../../shared/ui/header-title';

export default (props: {}): JSX.Element => (
  <Container>
    <Header hasTabs>
      <HeaderTitle />
    </Header>
    <Tabs tabBarUnderlineStyle={globalStyles.primaryBG}>
      <Tab heading="Profile" textStyle={styles.tabHeading} activeTextStyle={styles.tabHeadingActive}>
        <Profile />
      </Tab>
      <Tab heading="Courses" textStyle={styles.tabHeading} activeTextStyle={styles.tabHeadingActive}>
        <Courses />
      </Tab>
      <Tab heading="Account" textStyle={styles.tabHeading} activeTextStyle={styles.tabHeadingActive}>
        <Account />
      </Tab>
    </Tabs>
  </Container>
);

const styles = StyleSheet.create({
  tabHeading: {
    fontFamily: 'rubik-medium',
    color: DARK_GRAY
  },
  tabHeadingActive: {
    fontFamily: 'rubik-medium',
    color: PRIMARY
  }
});
