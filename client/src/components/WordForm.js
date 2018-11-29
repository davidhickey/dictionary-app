import React, { Component } from 'react';
import { Container, Header, Segment, Form, Input, TextArea, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
// import Input from '../components/Input';
// import TextArea from '../components/TextArea';



class WordForm extends Component {
  constructor(props) {
      super(props);

      this.state = {
        newWord: {
          word: '',
          definition: ''
        }
      }

      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleClearForm = this.handleClearForm.bind(this);
    }

    // var Input = (props) => {
    //     return (
    //     <label htmlFor={props.word} className="form-label">{'New Word'}</label>
    //     <input
    //       className="form-input"
    //       id={props.word}
    //       name={props.word}
    //       type={props.type}
    //       value={props.value}
    //       onChange={props.handleChange}
    //       placeholder={props.placeholder}
    //     />
    // )
    // }
    // export default Input;
  handleFormSubmit() {
     // Form submission logic
  }
  handleClearForm() {
     // Logic for resetting the form
  }



  render() {
    return (
      <Container>
      <Header as='h2'>{'Add A Word'}</Header>
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Field>
          <label>Add Word</label>
          <Input value={this.state.newWord.word} placeholder={'Add Word Here'}/>
        </Form.Field>
        <Form.Field>
          <label>Add Definition</label>
          <TextArea value={this.state.newWord.definition} placeholder={'Add Definition Here'}/>
        </Form.Field>

      <Button type="reset">Reset</Button>
      <Button type='submit'>Submit</Button>

    </Form>
    </Container>

    );
  }
}

  export default WordForm;
