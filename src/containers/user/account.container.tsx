import * as React from 'react';
import { StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Icon,
  Left,
  List,
  ListItem,
  Right,
  Text
} from 'native-base';

class Account extends React.Component<{}, {}> {
  public list = [
    {
      divider: true,
      text: 'General',
      textStyles: styles.divider
    },
    {
      text: 'change password'
    },
    {
      text: 'logout'
    },
    {
      text: 'delete account',
      textStyles: {color: '#B11A04', fontWeight: '600'}
    },
    {
      divider: true,
      text: 'Settings',
      textStyles: styles.divider
    },
    {
      text: 'push notifications'
    },
    {
      divider: true,
      text: 'Support',
      textStyles: styles.divider
    },
    {
      text: 'invite friends'
    },
    {
      text: 'help center'
    },
    {
      text: 'website'
    },
    {
      text: 'feedback'
    },
    {
      text: 'privacy policy'
    },
    {
      text: 'terms of use'
    },
  ];

  public render(): JSX.Element {
    return (
      <Container>
        <Content>
          <List dataArray={this.list} renderRow={item =>
            <ListItem itemDivider={item.divider} noIndent>
              <Left>
                <Text style={item.textStyles}>{item.text}</Text>
              </Left>
              {item.icon &&
                <Right>
                  <Icon name={item.divider ? 'arrow-forward' : ''} />
                </Right>}
            </ListItem>}>
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    fontFamily: 'rubik-medium',
    fontSize: 18
  }
});

export default connect()(Account);