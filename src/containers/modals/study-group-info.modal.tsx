import * as React from 'react';
import {
  Modal,
  Text,
  View,
} from 'react-native';
import {
  Button,
  Content,
  Container,
  Header,
  Left,
  Right
} from 'native-base';
import * as UI      from '../../shared/ui';
import globalStyles from '../../shared/styles';

interface StudyGroupInfoProps {
  studyGroupName: string;
  toggle: any;
}

export default class extends React.Component<StudyGroupInfoProps, {}> {
  public render(): JSX.Element {
    return (
      <View style={{padding: 15}}>
        <Modal animationType="slide" transparent={false}>
          <Container>
            <Header style={globalStyles.primaryBG}>
              <Left>
                <UI.HeaderCancelButton cancel={() => this.props.toggle(false)} />
              </Left>
              <UI.HeaderTitle title={this.props.studyGroupName} style={{flex: 3}} />
              <Right />
            </Header>
            <Content>
            </Content>
          </Container>
        </Modal>
      </View>
    );
  }
}