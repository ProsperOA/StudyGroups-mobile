import * as React      from 'react';
import * as Animatable from 'react-native-animatable';
import * as _          from 'lodash';
import { connect }     from 'react-redux';
import { Dispatch }    from 'redux';
import { StyleSheet, View, ScrollView }  from 'react-native';
import {
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
import { AppState }                      from '../../store/reducers';
import { Card }                          from '../../shared/ui';
import { DropdownMenu, Spinner }         from '../../shared/ui';
import { DropdownMenuItem }              from '../../shared/ui/dropdown-menu';
import { StudyGroupsFilter }             from '../../models/filters/study-groups.filter';
import { SearchStudyGroupsForm }         from '../../models/forms/search-study-groups.form';
import globalStyles, {
  INFO,
  DARK_GRAY,
  PRIMARY,
  WARNING_DARK
} from '../../shared/styles';

interface SearchStudyGroupsProps {
  studyGroups:    any;
  loading:        boolean;
  getStudyGroups: (filter: StudyGroupsFilter) => (
    Dispatch<actions.IGetStudyGroupsSuccess | actions.IGetStudyGroupsFailed>
  );
  getStudyGroupsStart: () => Dispatch<actions.IGetStudyGroupsStart>;
}

interface SearchStudyGroupsState {
  searchValue:      any;
  filterFormValue:  any;
  dropdownMenuOpen: boolean;
  showFilters:      boolean;
  filter:           StudyGroupsFilter;
  filtersApplied:   number;
}

const Form = t.form.Form;

class SearchStudyGroups extends React.Component<SearchStudyGroupsProps, SearchStudyGroupsState> {
  public pristineFilter = {
    pageIndex: 0,
    pageSize: 30,
    studyGroupName: '',
    availableSpots: 1,
    location: '',
    courseCode: '',
    courseName: '',
    instructor: '',
    term: '',
    meetingDate: ''
  };
  public state: Readonly<SearchStudyGroupsState> = {
    searchValue: '',
    filterFormValue: '',
    dropdownMenuOpen: false,
    showFilters:      false,
    filter:           this.pristineFilter,
    filtersApplied:   0
  };
  public searchInputRef: any;
  public filtersRef: any;

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

  public onSearchStudyGroups = (): void => {
    this.setState({
      filter: {
        ...this.state.filter,
        studyGroupName: this.state.searchValue
      }
    }, () => this.props.getStudyGroups(this.state.filter));
  };

  public onClearSearchValue = (): void => {
    this.setState({
      searchValue: '',
      filter: {
        ...this.state.filter,
        studyGroupName: ''
      }
    }, () => this.props.getStudyGroups(this.state.filter));
  };

  public onDropdownMenuItemPress = (route: string): void => {
    this.setState({ dropdownMenuOpen: false });
    navService.navigate(route);
  };

  public onFiltersBtnPress = (showFilters: boolean): void => {
    if (showFilters) {
      this.setState({ showFilters });
      this.filtersRef.slideInDown(250);
    }
    else {
      this.filtersRef.fadeOut(100).then(() => this.setState({ showFilters }));
    }
  };

  public onApplyFilters = (): void => {
    const value = this.refs.filtersForm.getValue();
    if (!value) return;

    const {
      name: courseName,
      code: courseCode,
      instructor,
      term,
      location,
      meetingDate
    } = value;

    const filter: StudyGroupsFilter = {
      ...this.state.filter,
      courseCode: courseCode || '',
      courseName: courseName || '',
      instructor: instructor || '',
      term: term || '',
      location: location || '',
      meetingDate: meetingDate || ''
    };

    this.setState({ filter }, () => {
      const f = _.omit({
        ...this.state.filter
      }, ['pageIndex', 'pageSize']);

      let filtersApplied = 0;
      Object.keys(f).forEach(key => {
        if (f[key] !== this.pristineFilter[key]) filtersApplied += 1;
      });

      this.setState({ filtersApplied });
    });

    this.onFiltersBtnPress(false);
    this.props.getStudyGroups(filter);
  };

  public onClearFilters = (): void => {
    const filterFormValue = {
      courseName: '',
      courseCode: '',
      instructor: '',
      term: '',
      location: ''
    }

    this.setState({
      ...this.state,
      filterFormValue,
      filter: {
        ...this.state.filter,
        ...filterFormValue
      }
    });

    this.onFiltersBtnPress(false);
  };

  public renderFilters = (): JSX.Element => (
    // FIXME: can't scroll past buttons
    <Animatable.View
      style={{display: !this.state.showFilters ? 'none' : 'flex'}}
      ref={(ref: any) => this.filtersRef = ref}>
      <Card cardStyle={{height: 'auto'}}>
        <React.Fragment>
          <Form
            ref="filtersForm"
            type={SearchStudyGroupsForm.type}
            options={SearchStudyGroupsForm.options}
            value={this.state.filterFormValue}
            onChange={(value: string) => this.setState({ filterFormValue: value })} />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.5, marginRight: 7.5}}>
              <Button
                style={[
                  {alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'},
                  globalStyles.btn,
                  globalStyles.btnSecondary
                ]}
                onPress={this.onClearFilters}>
                <Text style={globalStyles.btnText}>clear</Text>
              </Button>
            </View>
            <View style={{flex: 0.5, marginLeft: 7.5}}>
              <Button
                style={[
                  {alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'},
                  globalStyles.btn,
                  globalStyles.btnSuccess
                ]}
                onPress={this.onApplyFilters}>
                <Text style={globalStyles.btnText}>apply</Text>
              </Button>
            </View>
          </View>
        </React.Fragment>
      </Card>
    </Animatable.View>
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
              onChangeText={(searchValue: string) => this.setState({ searchValue })} />
            {this.state.searchValue
              ? <Animatable.View animation="fadeIn" duration={250}>
                  <Button
                    style={{height: 30, paddingTop: 0, paddingBottom: 0}}
                    onPress={this.onClearSearchValue}
                    transparent>
                    <Icon name="close" style={{color: DARK_GRAY}} />
                  </Button>
                </Animatable.View>
              : null}
          </Item>
          <Button onPress={this.onSearchStudyGroups} transparent>
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
              <Text style={{color: DARK_GRAY, fontFamily: 'rubik-regular'}}>
                {this.state.filtersApplied} filters applied
              </Text>
            </View>
            <View style={{flex: 0.5}}>
              <Button
                style={styles.filterBtn}
                disabled={this.state.dropdownMenuOpen}
                onPress={() => this.onFiltersBtnPress(!this.state.showFilters)}
                transparent>
                <Text
                  style={[
                    {color: this.state.showFilters ? WARNING_DARK : PRIMARY},
                    styles.filtersBtnText
                  ]}>
                  filters
                </Text>
              </Button>
            </View>
          </View>
          <ScrollView contentContainerStyle={{flex: 1}} style={{flex: 0.975}}>
            {this.renderFilters()}
            {this.props.studyGroups
              ? <Animatable.View animation="slideInUp" duration={500}>
                  <StudyGroupsCard studyGroups={this.props.studyGroups} />
                </Animatable.View>
              : <Text>no study groups found</Text>}
          </ScrollView>
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