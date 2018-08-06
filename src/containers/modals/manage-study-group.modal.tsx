import * as React                   from 'react';
import * as _                       from 'lodash';
import * as t                       from 'tcomb-form-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  Modal,
  Text,
  View
} from 'react-native';
import {
  Body,
  Button,
  Container,
  Content,
  Header,
  Left,
  List,
  ListItem,
  Right,
  Tab,
  Tabs,
  Thumbnail
} from 'native-base';

import ManageStudyGroupForm                from '../../models/forms/manage-study-group.form';
import { HeaderTitle, HeaderCancelButton } from '../../shared/ui';
import { StudyGroupSection }               from '../../models/study-group.model';
import globalStyles, {
  PRIMARY,
  DARK_GRAY,
  LIGHT_GRAY
} from '../../shared/styles';

interface ManageStudyGroupModalProps {
  studyGroup:        any;
  studyGroupMembers: any;
  closed:            any;
  updateStudyGroup:       (studyGroup: any) => void;
  removeStudyGroupMember: (user: any, section: StudyGroupSection) => void;
}

interface ManageStudyGroupModalState {
  formValue:         any;
  formValueLocation: string;
}

const Form = t.form.Form;

class ManageStudyGroupModal extends React.Component<ManageStudyGroupModalProps, ManageStudyGroupModalState> {
  public state: Readonly<ManageStudyGroupModalState> = {
    formValue:         null,
    formValueLocation: ''
  };

  public componentDidMount(): void {
    const { studyGroup } = this.props;

    this.setState({
      formValue: {
        name:        studyGroup.name,
        capacity:    studyGroup.members_limit,
        description: studyGroup.description,
        meetingDate: new Date(studyGroup.meeting_date)
      }
    });
  }

  public onUpdateStudyGroup = (): void => {
    const value = this.refs.updateStudyGroupForm.getValue();
    if (!value) return;

    const studyGroup = {
      ...this.props.studyGroup,
      name:          value.name,
      meeting_date:  value.meetingDate,
      members_limit: value.capacity,
      location:      this.state.formValueLocation
    };

    this.props.updateStudyGroup(studyGroup);
  };

  public renderStudyGroupUsers = (users: any, section: StudyGroupSection): JSX.Element[] => (
    users.map((user: any, index: number) => (
      <ListItem
        key={index}
        onPress={() => this.props.removeStudyGroupMember(user, section)}
        style={{paddingRight: 15, marginBottom: 10}} avatar>
        <Left>
          <Thumbnail circular source={{ uri: user.avatar }} />
        </Left>
        <Body>
          <Text>{user.first_name} {user.last_name}</Text>
        </Body>
      </ListItem>
    ))
  );

  public renderNoUsersText = (text: string): JSX.Element => (
    <Text style={{
      color: LIGHT_GRAY, fontSize: 17, fontFamily: 'rubik-medium', textAlign: 'center', margin: 15
    }}>
      {text}
    </Text>
  );

  public render(): JSX.Element {
    const { studyGroup, studyGroupMembers } = this.props;
    let members  = [];
    let waitlist = [];

    if (!_.isEmpty(studyGroupMembers)) {
      members  = studyGroupMembers.members;
      waitlist = studyGroupMembers.waitlist;
    }

    return (
      <Modal animationType="slide">
        <Container>
          <Header style={globalStyles.primaryBG}>
            <Left>
              <HeaderCancelButton cancel={this.props.closed} />
            </Left>
            <HeaderTitle title={this.props.studyGroup.name} style={{ flex: 3 }} />
            <Right />
          </Header>
          <Content>
            <View style={{padding: 15}}>
              <Form
                ref="updateStudyGroupForm"
                type={ManageStudyGroupForm.type}
                options={ManageStudyGroupForm.options}
                value={this.state.formValue}
                onChange={(formValue: any) => this.setState({ formValue })} />
              <Text style={{ color: LIGHT_GRAY, fontFamily: 'rubik-medium', fontSize: 17 }}>
                Location
              </Text>
              <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2}
                autoFocus={false}
                listViewDisplayed='false'
                getDefaultValue={() => studyGroup.location || ''}
                onPress={({ structured_formatting: v }: any) => this.setState({
                  formValueLocation: [v.main_text, v.secondary_text].join(', ')
                })}

                query={{
                  key: 'AIzaSyBlFPaefI3RPRjotv0N_QFbhaYWSSgo-5Y',
                  language: 'en',
                }}

                styles={{
                  textInputContainer: {
                    width: '100%',
                    backgroundColor: '#fff',
                    borderTopWidth: 0,
                    borderBottomWidth: 0
                  },
                  textInput: {
                    color: DARK_GRAY,
                    fontFamily: 'rubik-medium',
                    fontSize: 17,
                    marginLeft: 0,
                    marginRight: 0,
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: LIGHT_GRAY,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                  },
                  predefinedPlacesDescription: {
                    color: PRIMARY
                  },
                  listView: {
                    paddingLeft: 15,
                    paddingRight: 15
                  }
                }}

                nearbyPlacesAPI='GooglePlacesSearch'
                GooglePlacesSearchQuery={{
                  rankby: 'distance'
                }}

                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                debounce={200} />
            </View>
            <View style={{paddingTop: 15, paddingBottom: 15}}>
              <Tabs tabBarUnderlineStyle={globalStyles.primaryBG}>
                <Tab
                  heading="members"
                  textStyle={globalStyles.tabHeading}
                  activeTabStyle={globalStyles.tabHeadingActive}>
                  {members.length > 0 ?
                    <List style={{paddingTop: 15}}>
                      {this.renderStudyGroupUsers(members, 'members')}
                    </List> :
                    this.renderNoUsersText('no members')}
                </Tab>
                <Tab
                  heading="waitlist"
                  textStyle={globalStyles.tabHeading}
                  activeTabStyle={globalStyles.tabHeadingActive}>
                  {waitlist.length > 0 ?
                    <List style={{paddingTop: 15}}>
                      {this.renderStudyGroupUsers(waitlist, 'waitlist')}
                    </List> :
                    this.renderNoUsersText('waitlist empty')}
                </Tab>
              </Tabs>
              <Button
                style={[globalStyles.btn, globalStyles.btnSuccess, {
                  marginTop: 15, marginLeft: 15, marginRight: 15
                }]}
                onPress={this.onUpdateStudyGroup}
                block>
                <Text style={globalStyles.btnText}>update</Text>
              </Button>
            </View>
          </Content>
        </Container>
      </Modal>
    );
  }
}

export default ManageStudyGroupModal;