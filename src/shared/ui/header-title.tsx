import * as React      from 'react';
import { StyleSheet }  from 'react-native';
import { Body, Title } from 'native-base';

interface HeaderTitleProps {
  title?: string;
  style?: any;
}

export const HeaderTitle = ({ title = 'StudyGroups', style = {}}: HeaderTitleProps): JSX.Element => (
  <Body style={style}>
    <Title style={styles.heading}>{title}</Title>
  </Body>
);

const styles = StyleSheet.create({
  heading: {
    fontFamily: 'rubik-medium',
    fontSize: 22,
    color: '#fff'
  }
});
