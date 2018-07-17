import * as React  from 'react';
import * as _ from 'lodash';
import { Button } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

import StudyGroupInfoModal from '../modals/study-group-info.modal';
import { Card } from '../../shared/ui';
import { DARK_GRAY, PRIMARY } from '../../shared/styles';
import { parseDateTime } from '../../shared/utils';

interface StudyGroupsCardProps {
  studyGroups: any[];
}

interface StudyGroupsCardState {
  studyGroupInfoModalOpen: boolean;
  focusedStudyGroup: any;
}

export default class extends React.Component<StudyGroupsCardProps, StudyGroupsCardState> {
  public state: Readonly<StudyGroupsCardState> = {
    studyGroupInfoModalOpen: false,
    focusedStudyGroup: null
  };

  public onViewPress = (studyGroup: any): void => {
    this.setState({
      focusedStudyGroup: studyGroup,
      studyGroupInfoModalOpen: true
    });
  };

  public render(): JSX.Element[] {
    return this.props.studyGroups.map((group: any, index: number) => {
      return (
        <React.Fragment>
          <Card key={index} headerText={group.name}>
            <View style={{ flex: 1, flexDirection: 'column' }}>
              <View style={{ flex: 0.6, flexDirection: 'row' }}>
                <View style={{ flex: 0.5 }}>
                  {!_.isEmpty(group.course) &&
                    <Text style={styles.text}>
                      Course: {`${group.course.code ? group.course.code + ' -' : null} ${group.course.name}`}
                    </Text>}
                  <Text style={styles.text}>Available Spots: {group.available_spots}</Text>
                </View>
                <View style={{ flex: 0.5 }}>
                  <Text style={styles.text}>Location: {group.location || 'TBD'}</Text>
                  <Text style={styles.text}>Meeting On: {parseDateTime(group.meeting_date) || 'TBD'}</Text>
                </View>
              </View>
              <View style={{flex: 0.2}}>
                <Button onPress={() => this.onViewPress(group)} transparent>
                  <Text style={{color: PRIMARY, fontFamily: 'rubik-medium'}}>
                    view
                  </Text>
                </Button>
              </View>
            </View>
          </Card>
          {this.state.studyGroupInfoModalOpen &&
            <StudyGroupInfoModal
              studyGroupName={this.state.focusedStudyGroup.name}
              toggle={() => this.setState({ studyGroupInfoModalOpen: false })} />}
        </React.Fragment>
      );
    });
  }
}

const styles = StyleSheet.create({
  text: {
    color: DARK_GRAY,
    fontFamily: 'rubik-regular',
    marginBottom: 10
  }
});