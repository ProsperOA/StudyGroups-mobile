import * as React from 'react';
import { View } from 'react-native';
import {
  Button,
  Container,
  Content,
  List,
  ListItem,
  Text
} from 'native-base';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { AppState } from '../../store/reducers';
import * as actions from '../../store/actions';
import { Course, CourseAction } from '../../models/course.model';
import AddCourseModal from '../modals/add-course.modal';

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
    selectedCourse: {} as Course,
    addCourseModalVisible: false,
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
        <Content>
          <View flex={1} flexDirection="column">
          <View flex={0.85}>
            <List>
              {this.props.user.courses.map((course: Course, index: number) => (
                <ListItem
                  key={index}
                  style={{height: 50}}
                  onPress={() => this.onEditCourse(course)}
                  noIndent>
                  <Text>{course.code} - {course.name}</Text>
                </ListItem>
              ))}
            </List>
          </View>
            <View flex={0.15}>
              <Button
                onPress={() => this.onAddCoursePress()}
                block>
                <Text>add course</Text>
              </Button>
            </View>
          </View>
          {this.state.addCourseModalVisible &&
            <AddCourseModal
              updateCourses={this.onUpdateCourses}
              toggle={this.toggleAddCourseModal}
              course={this.state.selectedCourse}
              courseAction={this.state.selectedCourseAction} />}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth: { user }}: AppState) => ({ user });

const mapDispatchToProps =
  (dispatch: Dispatch<actions.IUpdateCoursesSuccess | actions.IUpdateCoursesFailed>) => ({
    updateCourses: (userID: string, courses: any) => (
      dispatch(actions.updateCourses(userID, courses))
    )
});

export default connect(mapStateToProps, mapDispatchToProps)(Courses);