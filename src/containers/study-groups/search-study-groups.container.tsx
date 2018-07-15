import * as React      from 'react';
import * as Animatable from 'react-native-animatable';
import {NavigationNavigatorProps} from 'react-navigation';
import { connect }     from 'react-redux';
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

import globalStyles, { INFO, DARK_GRAY }    from '../../shared/styles';
import navService from '../../shared/services/navigation.service';
import { AppState }    from '../../store/reducers';
import { DropdownMenu } from '../../shared/ui';
import { DropdownMenuItem } from '../../shared/ui/dropdown-menu';

interface SearchStudyGroupsProps extends NavigationNavigatorProps{
  user: any;
}

interface SearchStudyGroupsState  {
  searchValue: string;
  dropdownMenuOpen: boolean;
}

class SearchStudyGroups extends React.Component<SearchStudyGroupsProps, SearchStudyGroupsState> {
  public state: Readonly<SearchStudyGroupsState> = {
    searchValue: '',
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

  public onSearchStudyGroups = (event: any): void => {
    this.setState({ searchValue: event.nativeEvent.text });
  };

  public onDropdownMenuItemPress = (route: string): void => {
    this.setState({ dropdownMenuOpen: false });
    navService.navigate(route);
  }

  public render(): JSX.Element {
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
          cardAnimation="slideInLeft" />
        <Content>
          <Text>Hello {this.props.user.first_name}</Text>
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

const mapStateToProps = ({ auth: { user }}: AppState) => ({ user });

export default connect(mapStateToProps)(SearchStudyGroups);