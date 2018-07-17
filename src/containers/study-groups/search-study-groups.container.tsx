import * as React      from 'react';
import * as Animatable from 'react-native-animatable';
import { connect }     from 'react-redux';
import { Dispatch }    from 'redux';
import { StyleSheet, View, ScrollView }  from 'react-native';
import {
  Badge,
  Button,
  Container,
  Content,
  Header,
  Icon,
  Input,
  Item,
  Text
} from 'native-base';

import * as actions                      from '../../store/actions';
import navService                        from '../../shared/services/navigation.service';
import StudyGroupsCard                   from './study-groups-card.component';
import globalStyles, { INFO, DARK_GRAY, PRIMARY } from '../../shared/styles';
import { AppState }                      from '../../store/reducers';
import { Card }                          from '../../shared/ui';
import { DropdownMenu, Spinner }         from '../../shared/ui';
import { DropdownMenuItem }              from '../../shared/ui/dropdown-menu';
import { StudyGroupsFilter }             from '../../models/filters/study-groups.filter';

interface SearchStudyGroupsProps {
  studyGroups:    any;
  loading:        boolean;
  getStudyGroups: (filter: StudyGroupsFilter) => (
    Dispatch<actions.IGetStudyGroupsSuccess | actions.IGetStudyGroupsFailed>
  );
  getStudyGroupsStart: () => Dispatch<actions.IGetStudyGroupsStart>;
}

interface SearchStudyGroupsState  {
  searchValue:      string;
  dropdownMenuOpen: boolean;
  showFilters:      boolean;
  filter:           StudyGroupsFilter;
}

class SearchStudyGroups extends React.Component<SearchStudyGroupsProps, SearchStudyGroupsState> {
  public state: Readonly<SearchStudyGroupsState> = {
    searchValue:      '',
    dropdownMenuOpen: false,
    showFilters:      false,
    filter: {
      pageIndex: 0,
      pageSize: 30,
      name: '',
      availableSpots: 1,
      location: '',
      courseCode: '',
      courseName: '',
      instructor: '',
      term: ''
    }
  };
  public searchInputRef: any;

  public dropdownMenuItems: DropdownMenuItem[] = [
    {
      value: 'search groups',
      onPress: () => this.onDropdownMenuItemPress('SearchStudyGroups')
    },
    {
      value: 'manage groups'
    }
  ];

  public componentDidMount(): void {
    this.props.getStudyGroupsStart();
    this.props.getStudyGroups(this.state.filter);
  }

  public onSearchStudyGroups = (event: any): void => {
    this.setState({ searchValue: event.nativeEvent.text });
  };

  public onDropdownMenuItemPress = (route: string): void => {
    this.setState({ dropdownMenuOpen: false });
    navService.navigate(route);
  };

  public renderFilters = (): JSX.Element => (
    <View>
      <Animatable.View animation="slideInLeft" duration={500}>
        <Card>
          <Text>filters</Text>
        </Card>
      </Animatable.View>
    </View>
  );

  public render(): JSX.Element {
    if (this.props.loading) return <Spinner />;

    return (
      <Container>
        <Header style={globalStyles.primaryBG} searchBar>
          <Button
            onPress={() => this.setState({ dropdownMenuOpen: !this.state.dropdownMenuOpen })}
            transparent>
            <Icon
              type="FontAwesome"
              name="ellipsis-v"
              style={{color: '#fff', marginLeft: 0}} />
          </Button>
          <Item style={styles.searchBar}>
            <Icon type="FontAwesome" name="search" style={{color: DARK_GRAY}} />
            <Input
              ref={ref => this.searchInputRef = ref}
              placeholder="search"
              value={this.state.searchValue}
              style={{color: DARK_GRAY}}
              disabled={this.state.dropdownMenuOpen}
              onChange={this.onSearchStudyGroups} />
            {this.state.searchValue
              ? <Animatable.View animation="fadeIn" duration={250}>
                  <Button
                    style={{height: 30, paddingTop: 0, paddingBottom: 0}}
                    onPress={() => this.setState({ searchValue: '' })}
                    transparent>
                    <Icon name="close" style={{color: DARK_GRAY}} />
                  </Button>
                </Animatable.View>
              : null}
          </Item>
          <Button transparent>
            <Text style={styles.searchBtnText}>search</Text>
          </Button>
        </Header>
        <DropdownMenu
          open={this.state.dropdownMenuOpen}
          items={this.dropdownMenuItems}
          viewAnimation="fadeIn"
          cardAnimation="slideInLeft"
          closed={() => this.setState({ dropdownMenuOpen: false })} />
        <Content scrollEnabled={false} style={{flex: 1, padding: 15}}>
          <View style={{flex: 0.025, flexDirection: 'row'}}>
            <View style={{flex: 0.5}}>
              <Text># results</Text>
            </View>
            <View style={{flex: 0.5}}>
              <Button
                style={styles.filterBtn}
                disabled={this.state.dropdownMenuOpen}
                onPress={() => this.setState({ showFilters: !this.state.showFilters })}
                transparent>
                <Text style={styles.filtersBtnText}>filters</Text>
              </Button>
            </View>
          </View>
          {this.state.showFilters && this.renderFilters()}
          {this.props.studyGroups
            ? <ScrollView contentContainerStyle={{flex: 1}} style={{flex: 0.975}}>
                <Animatable.View animation="slideInUp" duration={500}>
                  <StudyGroupsCard studyGroups={this.props.studyGroups} />
                </Animatable.View>
              </ScrollView>
            : <Text>no study groups found</Text>}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 50,
    backgroundColor: INFO
  },
  searchBtnText: {
    fontSize: 20,
    fontFamily: 'rubik-medium',
    color: '#fff',
    paddingLeft: 5,
    paddingRight: 5
  },
  filterBtn: {
    paddingTop: 0,
    paddingBottom: 0,
    height: 20,
    alignSelf: 'flex-end'
  },
  filtersBtnText: {
    color: PRIMARY,
    fontSize: 20,
    fontFamily: 'rubik-medium',
    paddingLeft: 0,
    paddingRight: 0
  }
});

const mapStateToProps = ({ studyGroups }: AppState) => ({
  studyGroups: studyGroups.groups,
  loading:     studyGroups.loading
});

const mapDispatchToProps = (dispatch: Dispatch<actions.StudyGroupsAction>) => ({
  getStudyGroupsStart: () => dispatch(actions.getStudyGroupsStart()),
  getStudyGroups:      (filter: StudyGroupsFilter) => dispatch(actions.getStudyGroups(filter))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchStudyGroups);