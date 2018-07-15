import * as React from 'react';
import {
  Text,
  StyleSheet,
  View
} from 'react-native';
import { DARK_GRAY, LIGHT_GRAY } from '../styles';

interface CardProps {
  key?: string | number;
  cardStyle?: any;
  headerText: string;
  children: JSX.Element;
}

export const Card = (props: CardProps): JSX.Element => (
  <View style={[styles.mainView, props.cardStyle]}>
    <View style={styles.header}>
      <Text style={styles.headerText}>
        {props.headerText}
      </Text>
    </View>
    <View style={styles.body}>
      {props.children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#eee',
    marginBottom: 10,
    height: 150,
    borderColor: '#ddd',
    borderWidth: 1,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    shadowColor: '#ccc',
    shadowOpacity: 0.35,
    shadowOffset: {width: 3.5, height: 3.5}
  },
  header: {
    flex: 0.2,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  headerText: {
    justifyContent: 'flex-start',
    fontSize: 18,
    fontFamily: 'rubik-medium',
    color: DARK_GRAY
  },
  body: {
    flex: 0.8,
    padding: 15
  }
});