import * as React from 'react';
import * as t from 'tcomb-form-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {
  Modal,
  Text,
} from 'react-native';
import {
  Button,
  Container,
  Content,
  Header,
  Left,
  Right
} from 'native-base';

import globalStyles, { PRIMARY, DARK_GRAY, LIGHT_GRAY } from '../../shared/styles';
import ManageStudyGroupForm from '../../models/forms/manage-study-group.form';
import { HeaderTitle, HeaderCancelButton } from '../../shared/ui';

interface ManageStudyGroupModalProps {
  studyGroup: any;
  closed: any;
  updateStudyGroup: (studyGroup: any) => void;
}

interface ManageStudyGroupModalState {
  formValue: any;
  formValueLocation: string;
}

const Form = t.form.Form;

class ManageStudyGroupModal extends React.Component<ManageStudyGroupModalProps, ManageStudyGroupModalState> {
  public state: Readonly<ManageStudyGroupModalState> = {
    formValue: null,
    formValueLocation: ''
  };

  public componentDidMount(): void {
    const { studyGroup } = this.props;

    this.setState({
      formValue: {
        name: studyGroup.name,
        capacity: studyGroup.members_limit,
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
      name: value.name,
      meeting_date: value.meetingDate,
      members_limit: value.capacity,
      location: this.state.formValueLocation
    };

    this.props.updateStudyGroup(studyGroup);
  };

  public render(): JSX.Element {
    const { studyGroup } = this.props;

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
          <Content style={{ padding: 15 }}>
            <Form
              ref="updateStudyGroupForm"
              type={ManageStudyGroupForm.type}
              options={ManageStudyGroupForm.options}
              value={this.state.formValue}
              onChange={(formValue: any) => this.setState({ formValue })} />
            <Text style={{color: LIGHT_GRAY, fontFamily: 'rubik-medium', fontSize: 17}}>
              Location
            </Text>
            <GooglePlacesAutocomplete
              placeholder='Search'
              minLength={2}
              autoFocus={false}
              listViewDisplayed='false'
              getDefaultValue={() => studyGroup.location || ''}
              onPress={({ structured_formatting: v}: any) => this.setState({
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
            <Button
              style={[globalStyles.btn, globalStyles.btnSuccess, {marginTop: 15}]}
              onPress={this.onUpdateStudyGroup}
              block>
              <Text style={globalStyles.btnText}>update</Text>
            </Button>
          </Content>
        </Container>
      </Modal>
    );
  }
}

export default ManageStudyGroupModal;