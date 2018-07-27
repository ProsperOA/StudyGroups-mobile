import * as React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Content,
  Container,
  Header,
  Left,
  Right,
  Thumbnail,
  Button
} from 'native-base';

import * as UI      from '../../../shared/ui';
import StudyGroupInfo from './study-group-info.component';
import globalStyles, {
  DARK_GRAY,
  PRIMARY
} from '../../../shared/styles';

interface StudyGroupInfoModalProps {
  studyGroup:        any;
  studyGroupOwner:   any;
  studyGroupMembers: any;
  toggle:            any;
}

export default class extends React.Component<StudyGroupInfoModalProps, {}> {
  public render(): JSX.Element {
    const { studyGroup, studyGroupOwner, studyGroupMembers } = this.props;

    if (!studyGroup || !studyGroupOwner) {
      return <View style={{display: 'none'}} />;
    }

    return (
      <View style={{padding: 15}}>
        <Modal animationType="slide">
          <Container>
            <Header style={globalStyles.primaryBG}>
              <Left>
                <UI.HeaderCancelButton cancel={() => this.props.toggle(false)} />
              </Left>
              <UI.HeaderTitle title={studyGroup.name} style={{flex: 3}} />
              <Right />
            </Header>
            <Content scrollEnabled={false}>
              <View style={{flex: 1}}>
                <View style={{
                  flex: 0.3, flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc'
                }}>
                  <View style={{flex: 0.3}}>
                    <Thumbnail
                      source={{uri: studyGroupOwner.avatar}}
                      large />
                  </View>
                  <View style={{flex: 0.7}}>
                    <Text style={{
                      fontSize: 20, color: DARK_GRAY, fontFamily: 'rubik-medium', alignSelf: 'center'
                    }}>
                      {studyGroupOwner.first_name} {studyGroupOwner.last_name && studyGroupOwner.last_name}
                    </Text>
                    <Button style={[
                      {marginTop: 10}, globalStyles.btn, globalStyles.btnPrimaryOutline
                    ]} block>
                      <Text style={[globalStyles.btnText, {color: PRIMARY}]}>
                        message owner
                      </Text>
                    </Button>
                  </View>
                </View>
                <View style={{flex: 0.7}}>
                  <StudyGroupInfo
                    studyGroup={studyGroup}
                    studyGroupMembers={studyGroupMembers} />
                </View>
              </View>
            </Content>
            <View style={styles.footer}>
              <Button style={[
                globalStyles.btn,
                globalStyles.btnSuccess
              ]} block>
                <Text style={globalStyles.btnText}>request to join</Text>
              </Button>
            </View>
          </Container>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    marginBottom: 20,
    paddingLeft: 15,
    paddingRight: 15
  }
});