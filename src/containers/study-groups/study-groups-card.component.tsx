import * as React     from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Card } from '../../shared/ui';
import { DARK_GRAY } from '../../shared/styles';
import { parseDateTime } from '../../shared/utils';

interface StudyGroupsCardProps {
  studyGroups: any[];
}

export default ({ studyGroups }: StudyGroupsCardProps): JSX.Element[] => (
  studyGroups.map((group: any, index: number) => {

    // FIXME: parse json correctly on server
    if (group.course) group.course = JSON.parse(group.course);

    return (
      <Card key={index} headerText={group.name}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 0.5}}>
            {group.course &&
              <Text style={styles.text}>
                Course: {`${group.course.code ? group.course.code + ' -' : null} ${group.course.name}`}
              </Text>}
            <Text style={styles.text}>Available Spots: {group.available_spots}</Text>
          </View>
          <View style={{flex: 0.5}}>
            <Text style={styles.text}>Location: {group.location || 'TBD'}</Text>
            <Text style={styles.text}>Meeting On: {parseDateTime(group.meeting_date) || 'TBD'}</Text>
          </View>
        </View>
      </Card>
    );
  })
);

const styles = StyleSheet.create({
  text: {
    color: DARK_GRAY,
    fontFamily: 'rubik-regular',
    marginBottom: 10
  }
});