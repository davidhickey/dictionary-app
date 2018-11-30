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
          definition: '',
          quiz_id: '1'
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
    handleFormSubmit(e) {
      e.preventDefault();
      let wordData = this.state.newWord;

      fetch('/admin/cards',{
          method: "POST",
          body: JSON.stringify(wordData),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }).then(response => {
          response.json().then(data =>{
            console.log("Successful" + data);
          })
      })
    }

  handleClearForm(e) {
    e.preventDefault();
       this.setState({
         newWord: {
           word: '',
           definition: '',
           quiz_id: '1'
         },
       })
     }

     onChange(value, key) {
     this.setState((previousState) => {
       const newWord = previousState.newWord
       return { newWord: {...newWord, [key]: value} }
     })
   }




  render() {
    return (
      <Container>
      <Header as='h2'>{'Add A Word'}</Header>
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Field>
          <label>Add Word</label>
          <Input type='text' name={'word'} value={this.state.newWord.word} onChange={(e) => {this.onChange(e.target.value, 'word')}} placeholder={'Add Word Here'}/>

        </Form.Field>
        <Form.Field>
          <label>Add Definition</label>
          <TextArea type='text' name={'definition'} value={this.state.newWord.definition} onChange={(e) => {this.onChange(e.target.value, 'definition')}} placeholder={'Add Definition Here'}/>

        </Form.Field>

      <Button type="reset" onClick={this.handleClearForm}>Reset</Button>
      <Button type='submit'>Submit</Button>

    </Form>
    </Container>

    );
  }
}

  export default WordForm;
