import React, { Component } from 'react';
import { Container, Header, Segment, Input, TextArea, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
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
      <form className="container" onSubmit={this.handleFormSubmit}>
      <Segment.Group>
      <Segment>
      <Input />{'Word'}
      </Segment>
      <Segment>
      <TextArea />{'Definition'}
      </Segment>
      <Button.Group>
      <Button />{'Reset'}
      <Button />{'Submit'}
      </Button.Group>
      </Segment.Group>
    </form>
    </Container>

    );
  }
}

  export default WordForm;
