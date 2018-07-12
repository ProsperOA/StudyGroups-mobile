import * as React           from 'react';
import * as _               from 'lodash';
import { connect }          from 'react-redux';
import { Dispatch }         from 'redux';
import { ScrollView, View } from 'react-native';
import {
  Button,
  Container,
  Content,
  List,
  ListItem,
  Text
} from 'native-base';

import * as actions                from '../../store/actions';
import AddCourseModal              from '../modals/add-course.modal';
import globalStyles, { DARK_GRAY } from '../../shared/styles';
import { AppState }                from '../../store/reducers';
import { Course, CourseAction }    from '../../models/course.model';

interface CoursesProps {
  user: any;
  updateCourses: (userID: string, courses: any) => (
    Dispatch<actions.IUpdateCoursesSuccess | actions.IUpdateCoursesFailed>
  );
}

interface CourseState {
  addCourseModalVisible: boolean;
  selectedCourse:        Course;
  selectedCourseAction:  CourseAction;
}

class Courses extends React.Component<CoursesProps, CourseState> {
  public state: Readonly<CourseState> = {
    addCourseModalVisible: false,
    selectedCourse: {} as Course,
    selectedCourseAction: null
  };

  public toggleAddCourseModal = (visible: boolean): void => {
    if (!visible) {
      this.setState({
        selectedCourse: {} as Course,
        selectedCourseAction: null
      });
    }

    this.setState({ addCourseModalVisible: visible });
  };

  public onAddCoursePress = (): void => {
    this.setState({ selectedCourseAction: 'create' });
    this.toggleAddCourseModal(true);
  };

  public onUpdateCourses = (form: any, action: CourseAction): void => {
    const newCourse = form.getValue();
    if (!newCourse) return;

    const { courses } = this.props.user;
    const newCourses = _.cloneDeep(courses);
    const index = courses.indexOf(this.state.selectedCourse);

    switch (action) {
      case 'create':
        newCourses.push(newCourse);
        break;
      case 'update':
        newCourses[index] = newCourse;
        break;
      case 'delete':
        newCourses.splice(index, 1);
        break;
    }

    this.toggleAddCourseModal(false);
    this.props.updateCourses(this.props.user, newCourses);
  };

  public onEditCourse = (selectedCourse: Course): void => {
    this.setState({
      selectedCourse,
      selectedCourseAction: 'update'
    });
    this.toggleAddCourseModal(true);
  };

  public render(): JSX.Element {
    return (
      <Container>
        <Content scrollEnabled={false}>
          <ScrollView>
            <List>
              {this.props.user.courses.map((course: Course, index: number) => (
                <ListItem
                  key={index}
                  style={{ height: 50 }}
                  onPress={() => this.onEditCourse(course)}
                  noIndent>
                  <Text style={{ color: DARK_GRAY, fontFamily: 'rubik-medium' }}>
                    {course.code ? `${course.code} -` : null} {course.name}
                  </Text>
                </ListItem>
              ))}
            </List>
          </ScrollView>
        </Content>
        <View style={{marginBottom: 10}}>
          <Button
            style={[{ marginLeft: 15, marginRight: 15 }, globalStyles.btn, globalStyles.btnPrimary]}
            onPress={() => this.onAddCoursePress()}
            block>
            <Text style={globalStyles.btnText}>add course</Text>
          </Button>
        </View>
        {this.state.addCourseModalVisible &&
          <AddCourseModal
            updateCourses={this.onUpdateCourses}
            toggle={this.toggleAddCourseModal}
            course={this.state.selectedCourse}
            courseAction={this.state.selectedCourseAction} />}
      </Container>
    );
  }
}

const mapStateToProps = ({ auth: { user } }: AppState) => ({ user });

const mapDispatchToProps =
  (dispatch: Dispatch<actions.IUpdateCoursesSuccess | actions.IUpdateCoursesFailed>) => ({
    updateCourses: (userID: string, courses: any) => (
      dispatch(actions.updateCourses(userID, courses))
    )
  });

export default connect(mapStateToProps, mapDispatchToProps)(Courses);