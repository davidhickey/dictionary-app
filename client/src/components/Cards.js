import React, { Component } from 'react';
import { Container, Header, Segment, Form, Input, TextArea, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'


class Cards extends Component {
  constructor() {
   super();
   this.state = {
     show: true,
     quiz_id: true
   };
   this.onClick = this.handleClick.bind(this);
   this.getCards = this.getCards.bind(this)
   this.getCard = this.getCard.bind(this)
 }

 componentDidMount () {
   this.getCards()
 }

 fetch (endpoint) {
   return window.fetch(endpoint)
     .then(response => response.json())
     .catch(error => console.log(error))
 }

 getCards () {
   this.fetch('/api/cards')
     .then(cards => {
       if (cards.length) {
         this.setState({cards: cards})
         this.getCard(cards[0].id)
         console.log('got cards from api');
       } else {
         this.setState({cards: []})
       }
     })
 }

 getCard (id) {
   this.fetch(`/api/cards/${id}`)
     .then(card => this.setState({card: card, quiz_id: this.props.quiz_id}))
 }

 handleClick(event) {
   this.setState({
      // show: quiz.cards
   });
 }

 deleteCard(card){
   console.log(card);
   fetch('/admin/cards/'+card+'',{
       method: "DELETE",
       // body: JSON.stringify(wordData),
       headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
     }).then(
       this.getCards.bind(this)
     )


 }
 componentWillReceiveProps(props){
   const submitted = props.submitted
   if(submitted === 'true'){
     this.getCards()
   }
 }



  render(){
    let {cards, card} = this.state

    return cards
      ?<Segment.Group submitted={this.props.submitted}>
      <h2>{'My Words'}</h2>
        {cards && cards.length
          ?<Button.Group className="vertical" color='teal' fluid widths={cards.length}>
            {Object.keys(cards).map((key) => {
              // if(quiz_id == card.quiz_id){
                return <Button active={card && card.id === cards[key].id} fluid key={key} onClick={() => this.getCard(cards[key].id)}>
                {cards[key].word}
                <Icon className='right' name='close' onClick={() => this.deleteCard(cards[key].id)} />
              </Button>
            // }
            })}
          </Button.Group>
          : <Container textAlign='center'>No Cards found.</Container>
        }
        {card &&
            <Segment>{card.definition}</Segment>
        }
      </Segment.Group>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>

  }
}

export default Cards;
