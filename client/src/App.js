import React, { Component } from 'react';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'
//components
import Cards from './components/Cards';
import WordForm from './components/WordForm';
import QuizMode from './components/QuizMode';

class App extends Component {
  constructor () {
    super()
    this.state = {
      quiz_id: this.id,
      submitted: null

    }
    this.getQuizzes = this.getQuizzes.bind(this)
    this.getQuiz = this.getQuiz.bind(this)
    this.onChangeCard = this.onChangeCard.bind(this)
  }

  componentDidMount () {
    this.getQuizzes()
  }
  onChangeCard(){
      this.setState({submitted: 'true' })
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

  render () {
    let {quizzes, quiz} = this.state
    return quizzes
      ? <Container text>
        <Header as='h2' icon textAlign='center' color='teal'>
          <Icon name='unordered list' circular />
          <Header.Content>
            WordSaver
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
        <WordForm onChangeCard={this.onChangeCard} quiz_id={this.state.quiz_id} />
        <Cards data={quiz && quiz.id} submitted={this.state.submitted} quiz_id={this.state.quiz_id} />
        <QuizMode />





      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>

  }
}


export default App;
