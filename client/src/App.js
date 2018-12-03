import React, { Component } from 'react';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
//components
import WordForm from './components/WordForm';
class App extends Component {
  constructor () {
    super()
    this.state = {
      shown: true,
      quiz_id: this.id

    }
    this.getQuizzes = this.getQuizzes.bind(this)
    this.getQuiz = this.getQuiz.bind(this)

  }


  componentDidMount () {
    this.getQuizzes()
  }

  fetch (endpoint) {
    return window.fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.log(error))
  }

  getQuizzes () {
    this.fetch('/api/quizzes')
      .then(quizzes => {
        if (quizzes.length) {
          this.setState({quizzes: quizzes})
          this.getQuiz(quizzes[0].id)
        } else {
          this.setState({quizzes: []})
        }
      })
  }

  getQuiz (id) {
    this.fetch(`/api/quizzes/${id}`)
      .then(quiz => this.setState({quiz: quiz, quiz_id: quiz.id}))
  }

  cardState(){
    this.id.setState({isHidden: true
    })
  }

  toggle() {
   this.setState({
     shown: !this.state.shown
   })
 }

  render () {
    let {quizzes, quiz} = this.state
    var shown = {
			display: this.state.shown ? "block" : "none"
		};

		var hidden = {
			display: this.state.shown ? "none" : "block"
		}
    return quizzes
      ? <Container text>
        <Header as='h2' icon textAlign='center' color='teal'>
          <Icon name='unordered list' circular />
          <Header.Content>
            Word Quiz
          </Header.Content>
        </Header>
        <Divider hidden section />
        {quizzes && quizzes.length
          ? <Button.Group color='teal' fluid widths={quizzes.length}>
            {Object.keys(quizzes).map((key) => {
              return <Button active={quiz && quiz.id === quizzes[key].id} fluid key={key} onClick={() => this.getQuiz(quizzes[key].id)}>
                {quizzes[key].title}
              </Button>
            })}
          </Button.Group>
          : <Container textAlign='center'>No Quizzes found.</Container>
        }
        <Divider section />
        {quiz &&
          <Container>
            <Header as='h2'>{quiz.title}</Header>
            {quiz.description && <p>{quiz.description}</p>}
            {quiz.cards &&
              <Segment.Group>
                {quiz.cards.map((card, i) => <Segment key={i} onClick={this.toggle.bind(this)}>{card.word}
                <Segment style={hidden} key={i}>{card.definition}</Segment>
                </Segment>)}
              </Segment.Group>
            }


          </Container>

        }

        <Cards data={quiz && quiz.id}/>
        <WordForm/>
      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>

  }


}


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
       } else {
         this.setState({cards: []})
       }
     })
 }

 getCard (id) {
   this.fetch(`/api/cards/${id}`)
     .then(card => this.setState({card: card, quiz_id: card.quiz_id}))
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
     }).then(cards => {
       // if (cards.length) {
         this.setState({cards: cards})
         // this.getCard(cards[0].id)
       // } else {
       //   this.setState({cards: []})
       // }
       // response.json();
       // .then(data =>{
       //   console.log("Successful" + data);
       //   this.setState({
       //     newWord: {
       //       word: '',
       //       definition: '',
       //       quiz_id: '1'
       //     },
       //   })
       // })
   })


 }

  render(){
    let {cards, card} = this.state


    return cards
      ? <Segment.Group>
        {cards && cards.length
          ? <Button.Group className="vertical" color='teal' fluid widths={cards.length}>
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

export default App
