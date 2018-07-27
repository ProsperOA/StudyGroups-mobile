import * as React from 'react';
import * as _ from 'lodash';
import { Icon } from 'native-base';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import { DARK_GRAY } from '../../../shared/styles';

interface StudyGroupInfoProps {
  studyGroup:        any;
  studyGroupMembers: any;
}

export default (props: StudyGroupInfoProps): JSX.Element => {
  const {
    course,
    location,
    description,
    available_spots: spots
  } = props.studyGroup;
  const { code, name, instructor, term } = course;

  const { studyGroupMembers } = props;
  let members:     any[] = [];
  let waitlist:    any[] = [];
  let hasMembers:  boolean = false;
  let hasWaitlist: boolean = false;

  if (studyGroupMembers) {
    members     = studyGroupMembers.members;
    waitlist    = studyGroupMembers.waitlist;
    hasMembers  = members.length > 0;
    hasWaitlist = waitlist.length > 0;
  }

  return (
    <View style={{flex: 1, padding: 15}}>
      <View style={styles.infoView}>
        <View style={{flex: 0.05}}>
          <Icon
            type="FontAwesome"
            name={spots > 1 ? 'users' : 'user'}
            style={styles.icon} />
        </View>
        <View style={{flex: 0.95}}>
          <Text style={styles.text}>
            {spots} spot{spots > 1 && 's'} available
          </Text>
        </View>
      </View>
      {location &&
        <View style={styles.infoView}>
          <View style={{flex: 0.05}}>
            <Icon type="FontAwesome" name="map-marker" style={styles.icon} />
          </View>
          <View style={{flex: 0.95}}>
            <Text style={styles.text}>{location}</Text>
          </View>
        </View>}
      {!_.isEmpty(course) &&
        <View style={styles.infoView}>
          <View style={{flex: 0.05}}>
            <Icon type="FontAwesome" name="pencil" style={styles.icon} />
          </View>
          <View style={{flex: 0.95}}>
            <Text style={styles.text}>{`${code} - `}{name}</Text>
            {instructor &&
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={[styles.text, {fontFamily: 'rubik-regular', marginRight: 5}]}>
                  Instructor
                </Text>
                <Text style={styles.text}>{instructor}</Text>
              </View>}
            {term &&
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Text style={[styles.text, {fontFamily: 'rubik-regular', marginRight: 5}]}>
                  Term
                </Text>
                <Text style={styles.text}>{term}</Text>
              </View>}
          </View>
        </View>}
        {hasMembers || hasWaitlist ?
          <View style={styles.userCountView}>
            <View style={{flex: 0.9}}>
              {members.length &&
                <Text style={styles.text}>
                  {`${members.length + 1} people are going`}
                </Text>}
              {waitlist.length &&
                <Text style={styles.text}>
                  {`${waitlist.length + 1} people are waitlisted`}
                </Text>}
            </View>
            <View style={{flex: 0.1, alignItems: 'flex-end'}}>
              <Icon
                type="FontAwesome"
                name="angle-right"
                style={{color: DARK_GRAY, fontSize: 16}} />
            </View>
          </View> : null}
        <Text style={styles.text}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: 'rubik-medium',
    color: DARK_GRAY
  },
  icon: {
    fontSize: 16,
    color: DARK_GRAY
  },
  infoView: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20
  },
  userCountView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#ddd',
    borderBottomColor: '#ddd',
    padding: 15,
    marginBottom: 20
  }
});
