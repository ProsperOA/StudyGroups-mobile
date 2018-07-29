import * as React   from 'react';
import { connect }  from 'react-redux';
import { Dispatch } from 'redux';
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Button,
  Container,
  Content,
  Header,
  Icon
} from 'native-base';

import * as actions    from '../store/actions';
import globalStyles, {
  DARK_GRAY,
  GRAY,
  LIGHT_GRAY,
  PRIMARY
} from '../shared/styles';
import { AppState }                   from '../store/reducers';
import { BaseFilter }                 from '../models/filters/base.filter';
import { HeaderTitle, Spinner, Card } from '../shared/ui';

interface HomeProps {
  user:       any;
  userGroups: any;
  loading:    boolean;
  getStudyGroupsStart: () => Dispatch<actions.IGetStudyGroupsStart>;
  getUserStudyGroups: (userID: string, filter: BaseFilter) => (
    Dispatch<actions.IGetUserStudyGroupsSuccess | actions.IGetUserStudyGroupsFailed>
  );
}

interface HomeState {
  userStudyGroupsFilter: BaseFilter
}

class Home extends React.Component<HomeProps, HomeState> {
  public state: Readonly<HomeState> = {
    userStudyGroupsFilter: {
      pageIndex: 0,
      pageSize: 30
    }
  };

  public componentWillMount(): void {
    this.props.getStudyGroupsStart();
  }

  public componentDidMount(): void {
    const { id: userID } = this.props.user;
    const { userStudyGroupsFilter: filter } = this.state;
    this.props.getUserStudyGroups(userID, filter);
  }

  public renderUsersGroups = (): JSX.Element => {
    const { userGroups } = this.props;

    return (
      <React.Fragment>
        <View style={{flex: 0.2, flexDirection: 'row', marginBottom: 15}}>
          <View style={{flex: 0.5}}>
            <Text style={styles.sectionHeader}>
              Your Groups
            </Text>
          </View>
          <View style={{flex: 0.5}}>
            <Button
              style={{alignSelf: 'flex-end', paddingTop: 0, paddingBottom: 0, height: 16}}
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
                <Card key={index} cardStyle={{height: 80, width: 150, marginLeft: 5, marginRight: 5}}>
                  <Text style={styles.userGroupCardHeader}>
                    {group.name}
                  </Text>
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
        <Content style={{flex: 1, padding: 15}}>
          <View style={{flex: 0.3}}>
            {this.renderUsersGroups()}
          </View>
        </Content>
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
  user:       auth.user,
  userGroups: studyGroups.userGroups,
  loading:    studyGroups.loading
});

const mapDispatchToProps = (dispatch: Dispatch<actions.StudyGroupsAction>) => ({
  getStudyGroupsStart: () => dispatch(actions.getStudyGroupsStart()),
  getUserStudyGroups: (userID: string, filter: BaseFilter) => (
    dispatch(actions.getUserStudyGroups(userID, filter))
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);