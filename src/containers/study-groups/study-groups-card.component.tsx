import * as React  from 'react';
import * as _ from 'lodash';
import { Button } from 'native-base';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { StyleSheet, Text, View, Group } from 'react-native';

import * as actions from '../../store/actions';
import StudyGroupInfoModal from '../modals/study-group-info/study-group-info.modal';
import { AppState } from '../../store/reducers';
import { Card } from '../../shared/ui';
import { DARK_GRAY, PRIMARY } from '../../shared/styles';
import { parseDateTime } from '../../shared/utils';

interface StudyGroupCardProps {
  studyGroups:       any[];
  studyGroupMembers: any;
  studyGroupOwner:   any;
  getStudyGroupMembers: (studyGroupID: string) => (
    Dispatch<actions.IGetStudyGroupMembersSuccess | actions.IGetStudyGroupMembersFailed>
  );
  getUser: (userID: string) => Dispatch<actions.IGetUserSuccess | actions.IGetUserFailed>;
}

interface StudyGroupCardState {
  focusedStudyGroup:       any;
  studyGroupInfoModalOpen: boolean;
}

class StudyGroupCard extends React.Component<StudyGroupCardProps, StudyGroupCardState> {
  public state: Readonly<StudyGroupCardState> = {
    focusedStudyGroup:       null,
    studyGroupInfoModalOpen: false
  };

  public onViewStudyGroup = (studyGroup: any): void => {
    const { getStudyGroupMembers, getUser } = this.props;
      getUser(studyGroup.user_id);
      getStudyGroupMembers(studyGroup.id);

      this.setState({
        focusedStudyGroup: studyGroup,
        studyGroupInfoModalOpen: true
      });
  };

  public render(): JSX.Element[] {
    return this.props.studyGroups.map((group: any, index: number) => (
      <React.Fragment key={index}>
        <Card headerText={group.name}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 0.6, flexDirection: 'row' }}>
              <View style={{ flex: 0.5 }}>
                {!_.isEmpty(group.course) &&
                  <Text style={styles.text}>
                    Course: {`${group.course.code ? group.course.code + ' - ' : null}${group.course.name}`}
                  </Text>}
                <Text style={styles.text}>Available Spots: {group.available_spots}</Text>
              </View>
              <View style={{ flex: 0.5 }}>
                <Text style={styles.text}>Location: {group.location || 'TBD'}</Text>
                <Text style={styles.text}>Meeting On: {parseDateTime(group.meeting_date) || 'TBD'}</Text>
              </View>
            </View>
            <View style={{flex: 0.2}}>
              <Button onPress={() => this.onViewStudyGroup(this.props.studyGroups[index])} transparent>
                <Text style={{color: PRIMARY, fontFamily: 'rubik-medium'}}>
                  view
                </Text>
              </Button>
            </View>
          </View>
        </Card>
        {this.state.studyGroupInfoModalOpen &&
          <StudyGroupInfoModal
            studyGroup={this.state.focusedStudyGroup}
            studyGroupMembers={this.props.studyGroupMembers}
            studyGroupOwner={this.props.studyGroupOwner}
            toggle={() => this.setState({ studyGroupInfoModalOpen: false })} />}
      </React.Fragment>
    ));
  }
}

const styles = StyleSheet.create({
  text: {
    color: DARK_GRAY,
    fontFamily: 'rubik-regular',
    marginBottom: 10
  }
});

const mapStateToProps = ({ studyGroups, user }: AppState) => ({
  studyGroupMembers: studyGroups.users,
  studyGroupOwner: user.user
});

const mapDispatchToProps = (dispatch: Dispatch<actions.IGetStudyGroupMembersSuccess | actions.IGetStudyGroupMembersFailed>) => ({
  getStudyGroupMembers: (studyGroupID: string) => dispatch(actions.getStudyGroupMembers(studyGroupID)),
  getUser: (userID: string) => dispatch(actions.getUser(userID))
});

export default connect(mapStateToProps, mapDispatchToProps)(StudyGroupCard);