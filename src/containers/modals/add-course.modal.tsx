import * as React from 'react';
import { Modal, Text, View } from 'react-native';
import {
  Button,
  Content,
  Container,
  Header,
  Left,
  Right
} from 'native-base';
import * as t from 'tcomb-form-native';
import * as _ from 'lodash';
import { AddCourseForm } from '../../models/forms/add-course-form.model';
import { Course, CourseAction } from '../../models/course.model';
import globalStyles from '../../shared/styles';
import HeaderCancelButton from '../../shared/ui/header-cancel-button';
import HeaderTitle from '../../shared/ui/header-title';

const Form = t.form.Form;

interface AddCourseModalProps {
  course:        Course;
  courseAction:  CourseAction;
  toggle:        (visible: boolean) => void;
  updateCourses: (form: any, action: CourseAction) => void;
}

interface AddCourseModalState {
  value:         any;
  newCourse:     boolean;
  addCourseForm: any;
}

export default class extends React.Component<AddCourseModalProps, AddCourseModalState> {
  public state: Readonly<AddCourseModalState> = {
    value:         null,
    newCourse:     _.isEmpty(this.props.course),
    addCourseForm: _.cloneDeep(AddCourseForm),
  };

  public componentWillMount(): void {
    if (this.props.course) this.setState({ value: { ...this.props.course }});
  }

  public onCloseModal = (): void => this.props.toggle(false);

  public render(): JSX.Element {
    return (
      <View style={{padding: 15}}>
        <Modal
          animationType="slide"
          transparent={false}>
          <Container>
            <Header>
              <Left style={{paddingLeft: 10}}>
                <HeaderCancelButton cancel={this.onCloseModal} />
              </Left>
              <HeaderTitle title={`${this.state.newCourse ? 'Add' : 'Edit'} Course`} />
              <Right />
            </Header>
            <Content style={{padding: 15}}>
              <Form
                ref="addCourseForm"
                type={this.state.addCourseForm.type}
                options={this.state.addCourseForm.options}
                value={this.state.value}
                onChange={(value: string) => this.setState({ value })} />
              <Button
                style={[{marginBottom: 10}, globalStyles.btn, globalStyles.btnSuccess]}
                onPress={() => this.props.updateCourses(this.refs.addCourseForm, this.props.courseAction)}
                block>
                <Text style={globalStyles.btnText}>save</Text>
              </Button>
              {!this.state.newCourse &&
                <Button
                  style={[{marginTop: 10}, globalStyles.btn, globalStyles.btnDanger]}
                  onPress={() => this.props.updateCourses(this.refs.addCourseForm, 'delete')}
                  danger
                  block>
                  <Text style={globalStyles.btnDangerText}>delete</Text>
                </Button>}
            </Content>
          </Container>
        </Modal>
      </View>
    );
  }
}