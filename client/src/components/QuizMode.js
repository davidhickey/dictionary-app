import React, { Component } from 'react';
import { Container, Header, Segment, Form, Input, TextArea, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'


class QuizMode extends Component {

 state = {
     index: 0,
     showQuestion: true,
     correctCounter: 0,
     incorrectCounter: 0
 }

 // onCorrect = this.onCorrect.bind(this)
 // onIncorrect = this.onIncorrect.bind(this)

 onCorrect = () => {
       this.setState((state) => ({
           index: state.index + 1,
           correctCounter: state.correctCounter + 1
       }))
   }

   onIncorrect = () => {
       this.setState((state) => ({
           index: state.index + 1,
           incorrectCounter: state.correctCounter + 1
       }))
   }

   componentDidMount () {
     this.getQuizCards()
   }

   fetch (endpoint) {
     return window.fetch(endpoint)
       .then(response => response.json())
       .catch(error => console.log(error))
   }

   getQuizCards () {
     this.fetch('/api/cards')
       .then(cards => {
         if (cards.length) {
          var randomCard = cards[Math.floor(Math.random()*cards.length)]
           this.getQuizCard(cards[randomCard].id)
           console.log('got cards from api');
         } else {
           // this.setState({cards: []})
         }
       })
   }

   getQuizCard (id) {
     this.fetch(`/api/cards/${id}`)
       // .then(card => this.setState({card: card, quiz_id: this.props.quiz_id}))
   }






  //gets all Cards
  //shows definition
  //on click, shows word
  //asks if I got it right or wrong
  //shows total count of correct and wrong words for quiz
  //button for reset quiz


  render () {
    return (
      <h1>Quiz Mode</h1>
    )

  }


}

export default QuizMode;
