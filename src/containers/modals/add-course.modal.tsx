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
import { Course } from '../../models/course.model';

const Form = t.form.Form;

interface AddCourseModalProps {
  save:   any;
  toggle: any;
  course: Course;
}

interface AddCourseModalState {
  value:         any;
  addCourseForm: any;
}

export default class extends React.Component<AddCourseModalProps, AddCourseModalState> {
  public state: Readonly<AddCourseModalState> = {
    value:         null,
    addCourseForm: _.cloneDeep(AddCourseForm)
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
                  {_.isEmpty(this.props.course) ? 'Add' : 'Edit'} Course
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
              <Button onPress={() => this.props.save(this.refs.addCourseForm)} block>
                <Text>save</Text>
              </Button>
              <Button onPress={this.onCloseModal} light block>
                <Text>cancel</Text>
              </Button>
            </Content>
          </Container>
        </Modal>
      </View>
    );
  }
}