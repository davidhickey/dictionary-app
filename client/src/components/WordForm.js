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
     getDefinition(e){
      //  e.preventDefault();
      // let url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'+ value +'?key=c7ab16a7-6f5a-45f3-b42d-d60b0fab9d91'
      //  fetch(url,{
      //      method: "GET"
      //    }).then(response => {
      //      console.log("response", response);
      //
      //      // response.json().then(data =>{
      //      //   console.log("Successful" + data);
      //      // })
      //  })

     }

     onChange(value, key) {
     this.setState((previousState) => {
       const newWord = previousState.newWord
       return { newWord: {...newWord, [key]: value} }
     })
   }


   onClickDef(value){
    // let value = this.state.newWord.word
    console.log(value)
     let url = 'https://www.dictionaryapi.com/api/v3/references/collegiate/json/'+ value +'?key=c7ab16a7-6f5a-45f3-b42d-d60b0fab9d91'
      fetch(url,{
          method: "GET"
        }).then(response => {
          console.log("response", response);

          response.json().then(data =>{
            console.log(data[0].shortdef);
            this.setState({
              newWord: {
                word: value,
                definition: data[0].shortdef[0],
                 quiz_id: '1'
              }
              })
          })
      })
   }





  render() {
    return (
      <Container>
      <Header as='h2'>{'Add A Word'}</Header>
      <Form onSubmit={this.handleFormSubmit}>
        <Form.Field>
          <label>Add Word</label>
          <Input type='text' name={'word'} value={this.state.newWord.word || ''} onChange={(e) => {this.onChange(e.target.value, 'word')}} placeholder={'Add Word Here'}/>
        </Form.Field>
        <Button type="button" onClick={() => this.onClickDef(this.state.newWord.word)}>Get Definition</Button>

          <h4>Definition</h4>
          <p type='text' name={'definition'} value={this.state.newWord.definition}><b>{this.state.newWord.word}</b><br/>{this.state.newWord.definition}</p>


      <Button type="reset" onClick={this.handleClearForm}>Reset</Button>
      <Button type='submit'>Submit</Button>

    </Form>
    </Container>

    );
  }
}

  export default WordForm;
