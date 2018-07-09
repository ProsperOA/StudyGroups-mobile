import * as React from 'react';
import { Modal, Text, View } from 'react-native';
import {
  Body,
  Button,
  Content,
  Container,
  Header,
  Left,
  Right,
  Title
} from 'native-base';
import * as t from 'tcomb-form-native';
import * as _ from 'lodash';
import { AddCourseForm } from '../../models/forms/add-course-form.model';
import { Course, CourseAction } from '../../models/course.model';

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
                <Button onPress={this.onCloseModal} transparent>
                  <Text style={{fontSize: 16, color: '#1F61A0'}}>cancel</Text>
                </Button>
              </Left>
              <Body>
                <Title>
                  {this.state.newCourse ? 'Add' : 'Edit'} Course
                </Title>
              </Body>
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
                onPress={() => this.props.updateCourses(this.refs.addCourseForm, this.props.courseAction)}
                block>
                <Text>save</Text>
              </Button>
              {!this.state.newCourse &&
                <Button onPress={() => this.props.updateCourses(this.refs.addCourseForm, 'delete')}
                  danger
                  block>
                  <Text>delete</Text>
                </Button>}
            </Content>
          </Container>
        </Modal>
      </View>
    );
  }
}