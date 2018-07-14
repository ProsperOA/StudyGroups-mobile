import * as React      from 'react';
import * as Animatable from 'react-native-animatable';
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

import globalStyles, { INFO, DARK_GRAY }    from '../shared/styles';
import { AppState }    from '../store/reducers';

interface HomeProps {
  user: any;
}

interface HomeState {
  searchValue: string;
}

class Home extends React.Component<HomeProps, HomeState> {
  public state: Readonly<HomeState> = {
    searchValue: ''
  };
  public searchInputRef: any;

  public onSearchStudyGroups = (event: any): void => {
    this.setState({ searchValue: event.nativeEvent.text });
  };

  public render(): JSX.Element {
    return (
      <Container>
        <Header style={globalStyles.primaryBG} searchBar>
          <Button transparent>
            <Icon type="FontAwesome" name="ellipsis-v" style={{color: '#fff', marginLeft: 0}} />
          </Button>
          <Item style={styles.searchBar}>
            <Icon type="FontAwesome" name="search" style={{color: DARK_GRAY}} />
            <Input
              ref={ref => this.searchInputRef = ref}
              placeholder="Search"
              value={this.state.searchValue}
              style={{color: DARK_GRAY}}
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
          <Button style={{paddingLeft: 0}} transparent>
            <Text style={styles.filtersBtn}>filters</Text>
          </Button>
        </Header>
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

export default connect(mapStateToProps)(Home);