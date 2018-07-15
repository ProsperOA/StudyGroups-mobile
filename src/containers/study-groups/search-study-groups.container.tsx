import * as React      from 'react';
import * as Animatable from 'react-native-animatable';
import { connect }     from 'react-redux';
import { Dispatch }    from 'redux';
import { StyleSheet }  from 'react-native';
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
import globalStyles, { INFO, DARK_GRAY } from '../../shared/styles';
import { AppState }                      from '../../store/reducers';
import { DropdownMenu, Spinner }         from '../../shared/ui';
import { DropdownMenuItem }              from '../../shared/ui/dropdown-menu';

interface SearchStudyGroupsProps {
  studyGroups:    any;
  loading:        boolean;
  getStudyGroups: () => (
    Dispatch<actions.IGetStudyGroupsSuccess | actions.IGetStudyGroupsFailed>
  );
  getStudyGroupsStart: () => Dispatch<actions.IGetStudyGroupsStart>;
}

interface SearchStudyGroupsState  {
  searchValue:      string;
  dropdownMenuOpen: boolean;
}

class SearchStudyGroups extends React.Component<SearchStudyGroupsProps, SearchStudyGroupsState> {
  public state: Readonly<SearchStudyGroupsState> = {
    searchValue:      '',
    dropdownMenuOpen: false
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
    this.props.getStudyGroups();
  }

  public onSearchStudyGroups = (event: any): void => {
    this.setState({ searchValue: event.nativeEvent.text });
  };

  public onDropdownMenuItemPress = (route: string): void => {
    this.setState({ dropdownMenuOpen: false });
    navService.navigate(route);
  };

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
          <Button
            style={{paddingLeft: 0}}
            disabled={this.state.dropdownMenuOpen}
            transparent>
            <Text style={styles.filtersBtn}>filters</Text>
          </Button>
        </Header>
        <DropdownMenu
          open={this.state.dropdownMenuOpen}
          items={this.dropdownMenuItems}
          viewAnimation="fadeIn"
          cardAnimation="slideInLeft"
          closed={() => this.setState({ dropdownMenuOpen: false })} />
        <Content style={{padding: 15}}>
          {this.props.studyGroups
            ? <Animatable.View animation="slideInUp" duration={500}>
                <StudyGroupsCard studyGroups={this.props.studyGroups} />
              </Animatable.View>
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
  filtersBtn: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'rubik-medium',
    paddingLeft: 10,
    paddingRight: 10
  }
});

const mapStateToProps = ({ studyGroups }: AppState) => ({
  studyGroups: studyGroups.groups,
  loading:     studyGroups.loading
});

const mapDispatchToProps = (dispatch: Dispatch<actions.StudyGroupsAction>) => ({
  getStudyGroupsStart: () => dispatch(actions.getStudyGroupsStart()),
  getStudyGroups:      () => dispatch(actions.getStudyGroups())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchStudyGroups);