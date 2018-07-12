import * as React      from 'react';
import { StyleSheet }  from 'react-native';
import { Body, Title } from 'native-base';

import { DARK_GRAY } from '../styles';

interface HeaderTitleProps {
  title?: string;
}

export const HeaderTitle = ({ title = 'StudyGroups' }: HeaderTitleProps): JSX.Element => (
  <Body>
    <Title style={styles.heading}>{title}</Title>
  </Body>
);

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'rubik-medium',
    color: DARK_GRAY
  }
});
