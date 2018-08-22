import * as React   from 'react';
import * as _       from 'lodash';
import { connect }  from 'react-redux';
import { Dispatch } from 'redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {
  ActionSheet,
  Button,
  Container,
  Content,
  Header,
  Icon
} from 'native-base';

import * as actions                   from '../store/actions';
import ManageStudyGroupModal          from './modals/manage-study-group.modal';
import { AppState }                   from '../store/reducers';
import { BaseFilter }                 from '../models/filters/base.filter';
import { HeaderTitle, Spinner, Card } from '../shared/ui';
import { StudyGroupSection }          from '../models/study-group.model';
import globalStyles, {
  DARK_GRAY,
  GRAY,
  LIGHT_GRAY,
  PRIMARY
} from '../shared/styles';

interface HomeProps {
  user:              any;
  userGroups:        any;
  studyGroupMembers: any;
  loading:           boolean;
  getStudyGroupsStart: () => Dispatch<actions.IGetStudyGroupsStart>;
  getUserStudyGroups: (userID: string, filter: BaseFilter) => (
    Dispatch<actions.IGetUserStudyGroupsSuccess | actions.IGetUserStudyGroupsFailed>
  );
  getStudyGroupMembers: (studyGroupID: string) => (
    Dispatch<actions.IGetStudyGroupMembersSuccess | actions.IGetStudyGroupMembersFailed>
  );
  createStudyGroup: (studyGroup: any) => (
    Dispatch<actions.ICreateStudyGroupSuccess| actions.ICreateStudyGroupFailed>
  );
  updateStudyGroup: (studyGroup: any) => (
    Dispatch<actions.IUpdateStudyGroupSuccess | actions.IUpdateStudyGroupFailed>
  );
  moveUserFromWaitlistToMembers: (studyGroup: any, userID: number, section: StudyGroupSection) => (
    Dispatch<actions.IMoveUserFromWaitlistToMembersSuccess| actions.IMoveUserFromWaitlistToMembersFailed>
  );
  removeUserFromStudyGroup: (studyGroup: any, userID: number, section: StudyGroupSection) => (
    Dispatch<actions.ILeaveStudyGroupSuccess| actions.ILeaveStudyGroupFailed>
  );
}

interface HomeState {
  userStudyGroupsFilter:     BaseFilter;
  focusedStudyGroup:         any;
  manageStudyGroupModalOpen: boolean;
}

class Home extends React.Component<HomeProps, HomeState> {
  public state: Readonly<HomeState> = {
    userStudyGroupsFilter: {
      pageIndex: 0,
      pageSize: 30
    },
    manageStudyGroupModalOpen: false,
    focusedStudyGroup:         null
  };

  public componentWillMount(): void {
    this.props.getStudyGroupsStart();
  }

  public componentDidMount(): void {
    const { id: userID } = this.props.user;
    const { userStudyGroupsFilter: filter } = this.state;
    this.props.getUserStudyGroups(userID, filter);
  }

  public onUserStudyGroupPress = (focusedStudyGroup: any): void => {
    this.setState({
      focusedStudyGroup,
      manageStudyGroupModalOpen: true
    });
    this.props.getStudyGroupMembers(focusedStudyGroup.id);
  };

  public onCreateStudyGroup = (studyGroup: any): void => {
    studyGroup.user_id = this.props.user.id;
    this.props.createStudyGroup(studyGroup);
    this.setState({ manageStudyGroupModalOpen: false });
  };

  public onUpdateStudyGroup = (studyGroup: any): void => {
    this.props.updateStudyGroup(studyGroup);
    this.setState({
      focusedStudyGroup: null,
      manageStudyGroupModalOpen: false
    });
  };

  public onRemoveStudyGroupMember = (user: any, section: StudyGroupSection): void => {
    const isWaitlist = section === 'waitlist';
    const options = [
      `remove user from ${isWaitlist ? 'waitlist' : 'group'}`,
      'cancel'
    ];
    if (isWaitlist) options.unshift('add to study group');

    ActionSheet.show(
      {
        options,
        cancelButtonIndex: isWaitlist ? 2 : 1,
        title: `${user.first_name}${user.last_name ? ` ${user.last_name}` : ''}`
      },
      (btnIndex: number) => {
        if ((btnIndex === 0 && !isWaitlist) || (btnIndex === 1 && isWaitlist)) {
          const studyGroup = _.cloneDeep(this.state.focusedStudyGroup);

          const sec = studyGroup[section].split(',');
          sec.splice(sec.indexOf(user.id.toString()), 1);
          studyGroup[section] = sec.join(',');

          this.props.removeUserFromStudyGroup(studyGroup, user.id, section);
          this.setState({ focusedStudyGroup: studyGroup });
        }
        else if (btnIndex === 0 && isWaitlist) {
          this.props.moveUserFromWaitlistToMembers(this.state.focusedStudyGroup.id, user.id, section);
        }
      }
    );
  };

  public onNewGroupBtnPress = (): void => {
    this.setState({
      focusedStudyGroup: null,
      manageStudyGroupModalOpen: true
    });
  };

  public renderUsersGroups = (): JSX.Element => {
    const { userGroups } = this.props;

    return (
      <React.Fragment>
        <View style={{flex: 0.2, flexDirection: 'row', marginBottom: 15}}>
          <View style={{flex: 0.5, paddingLeft: 15}}>
            <Text style={styles.sectionHeader}>
              Your Groups
            </Text>
          </View>
          <View style={{flex: 0.5, paddingRight: 15}}>
            <Button
              style={{alignSelf: 'flex-end', paddingTop: 0, paddingBottom: 0, height: 16}}
              onPress={this.onNewGroupBtnPress}
              transparent>
              <Icon
                type="Octicons"
                name="plus"
                style={{color: LIGHT_GRAY, fontSize: 16, marginLeft: 0, marginRight: 5, marginTop: -2}} />
              <Text style={{color: LIGHT_GRAY, fontFamily: 'rubik-regular', fontSize: 16}}>
                new group
              </Text>
            </Button>
          </View>
        </View>
        <View style={{flex: 0.8}}>
          {userGroups ?
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              pagingEnabled>
              {userGroups.map((group: any, index: number) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.onUserStudyGroupPress(group)}>
                  <Card cardStyle={{height: 80, width: 150, marginLeft: 5, marginRight: 5}}>
                    <Text style={styles.userGroupCardHeader}>{group.name}</Text>
                    {group.members ?
                      <Text style={styles.userGroupCardText}>
                        {group.members.split(',').length} members
                      </Text> :
                      <Text style={styles.userGroupCardText}>no members</Text>}
                    {group.waitlist ?
                      <Text style={styles.userGroupCardText}>
                        {group.waitlist.split(',').length} waitlisted
                      </Text> :
                      <Text style={styles.userGroupCardText}>waitlist empty</Text>}
                  </Card>
                </TouchableOpacity>
              ))}
            </ScrollView> :
            <Button style={[
              globalStyles.btn, globalStyles.btnPrimaryOutline, styles.btnCreateStudyGroup
            ]}>
              <Text style={{color: PRIMARY, fontFamily: 'rubik-medium'}}>
                create a study group
              </Text>
            </Button>}
        </View>
      </React.Fragment>
    );
  };

  public render(): JSX.Element {
    if (this.props.loading) return <Spinner />;

    return (
      <Container>
        <Header style={globalStyles.primaryBG}>
          <HeaderTitle />
        </Header>
        <Content style={{flex: 1, paddingTop: 15, paddingBottom: 15}}>
          <View style={{flex: 0.3}}>
            {this.renderUsersGroups()}
          </View>
        </Content>
        {this.state.manageStudyGroupModalOpen &&
          <ManageStudyGroupModal
            studyGroup={this.state.focusedStudyGroup}
            studyGroupMembers={this.props.studyGroupMembers}
            createStudyGroup={this.onCreateStudyGroup}
            updateStudyGroup={(studyGroup: any) => this.onUpdateStudyGroup(studyGroup)}
            removeStudyGroupMember={this.onRemoveStudyGroupMember}
            closed={() => this.setState({ manageStudyGroupModalOpen: false})} />}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  sectionHeader: {
    color: DARK_GRAY,
    fontFamily: 'rubik-medium',
    fontSize: 25
  },
  userGroupCardHeader: {
    color: DARK_GRAY,
    fontFamily: 'rubik-medium',
    fontSize: 16,
    marginBottom: 2
  },
  userGroupCardText: {
    color: GRAY,
    fontFamily: 'rubik-regular'
  },
  btnCreateStudyGroup: {
    height: 32,
    paddingLeft: 6,
    paddingRight: 6
  }
});

const mapStateToProps = ({ studyGroups, auth }: AppState) => ({
  user:              auth.user,
  userGroups:        studyGroups.userGroups,
  studyGroupMembers: studyGroups.users,
  loading:           studyGroups.loading
});

const mapDispatchToProps = (dispatch: Dispatch<actions.StudyGroupsAction>) => ({
  getStudyGroupsStart: () => dispatch(actions.getStudyGroupsStart()),
  getUserStudyGroups: (userID: string, filter: BaseFilter) => (
    dispatch(actions.getUserStudyGroups(userID, filter))
  ),
  getStudyGroupMembers: (studyGroupID: string) => (
    dispatch(actions.getStudyGroupMembers(studyGroupID))
  ),
  updateStudyGroup: (studyGroup: any) => dispatch(actions.updateStudyGroup(studyGroup)),
  createStudyGroup: (studyGroup: any) => dispatch(actions.createStudyGroup(studyGroup)),
  moveUserFromWaitlistToMembers: (studyGroupID: number, userID: number) => (
    dispatch(actions.moveUserFromWaitlistToMembers(studyGroupID, userID))
  ),
  removeUserFromStudyGroup: (studyGroup: any, userID: number, section: StudyGroupSection) => (
    dispatch(actions.leaveStudyGroup(studyGroup, userID, section))
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);