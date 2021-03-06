import * as React                   from 'react';
import * as _                       from 'lodash';
import * as t                       from 'tcomb-form-native';
import { connect }                  from 'react-redux';
import { Dispatch }                 from 'redux';
import { ImagePicker, Permissions } from 'expo';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Button,
  Container,
  Content,
  Spinner,
  Thumbnail,
  Toast
} from 'native-base';

import * as actions              from '../../store/actions';
import globalStyles, { PRIMARY } from '../../shared/styles';
import { AppState }              from '../../store/reducers';
import { ProfileForm }           from '../../models/forms/profile.form';
import { ProfileInfo }           from '../../models/profile-info.model';
import { UserState }             from '../../store/reducers/user.reducer';

const Form = t.form.Form;

interface ProfileProps extends UserState {
  user:               any;
  uploadAvatar: (user: any, image: string) => (
    Dispatch<actions.IUploadAvatarSuccess | actions.IUploadAvatarFailed>
  );
  updateProfile: (userID: string, profileInfo: ProfileInfo) => (
    Dispatch<actions.IUpdateProfileSuccess | actions.IUpdateProfileFailed>
  );
  updateProfileStart: () => Dispatch<actions.IUpdateProfileStart>;
}

interface ProfileState {
  hasCameraPermission: boolean;
  image:               any;
  value:               any;
}

class Profile extends React.Component<ProfileProps, ProfileState> {
  public state: Readonly<ProfileState> = {
    hasCameraPermission: false,
    image:               null,
    value:               null
  };

  public componentWillMount(): void {
    const user = _.cloneDeep(this.props.user);
    user.firstName = user.first_name;
    user.lastName  = user.last_name;

    _.omit(user, ['first_name', 'last_name']);

    this.setState({ value: { ...user }});
  }

  public componentDidUpdate(): void {
    const { error } = this.props;

    if (error)
      Toast.show({
        text: error,
        textStyle: {
          color:      '#fff',
          fontWeight: 'bold',
          textAlign:  'center'
        },
        position: 'bottom',
        duration:  2500
      });
  }

  public handleSave = (): void => {
    const value = this.refs.profileForm.getValue();
    if (!value) return;

    this.props.updateProfileStart();

    const { firstName, lastName, school, major1, major2, minor, bio } = value;

    const profileInfo: ProfileInfo = {
      firstName,
      lastName,
      school,
      major1,
      major2,
      minor,
      bio
    };

    this.props.updateProfile(this.props.user.id, profileInfo);
  };

  public handleUploadAvatar = async (): Promise<any> => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasCameraPermission: status === 'granted' });

    if (!this.state.hasCameraPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (result.cancelled) return;

    this.setState({ image: result.uri });
    this.props.uploadAvatar(this.props.user, this.state.image);
  };

  public render(): JSX.Element {
    return (
      <Container>
        <Content style={{flex: 1, flexDirection: 'column'}}>
          <View style={styles.avatarView}>
            <Thumbnail source={{uri: this.props.user.avatar}} large />
            <Button
              onPress={this.handleUploadAvatar}
              style={{alignSelf: 'auto'}}
              transparent>
              <Text style={{fontWeight: 'bold', color: PRIMARY}}>
                change profile photo
              </Text>
            </Button>
          </View>
          <View style={styles.profileInfo}>
            <Form
              ref="profileForm"
              type={ProfileForm.type}
              options={ProfileForm.options}
              value={this.state.value}
              onChange={(value: string) => this.setState({ value })} />
            <Button
              style={[globalStyles.btn, globalStyles.btnSuccess]}
              onPress={this.handleSave}
              block>
              <Text style={globalStyles.btnText}>
                {this.props.loading ? <Spinner color="#fff" /> : 'save'}
              </Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  avatarView: {
    backgroundColor: '#eee',
    flex: 0.25,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15
  },
  profileInfo: {
    flex: 0.75,
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: 15
  }
});

const mapStateToProps = ({ auth, user }: AppState) => ({
  ...user,
  user: auth.user
});

const mapDispatchToProps = (dispatch: Dispatch<actions.UserAction>) => ({
  uploadAvatar: (user: any, image: string) => dispatch(actions.uploadAvatar(user, image)),
  updateProfile: (
    (userID: string, profileInfo: ProfileInfo) => dispatch(actions.updateProfile(userID, profileInfo))
  ),
  updateProfileStart: () => dispatch(actions.updateProfileStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);