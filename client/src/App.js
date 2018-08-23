import React, { Component } from 'react';
import { Container, Header, Segment, Button, Icon, Dimmer, Loader, Divider } from 'semantic-ui-react'

class App extends Component {
  constructor () {
    super()
    this.state = {
      shown: true
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
      .then(quiz => this.setState({quiz: quiz}))
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
      </Container>
      : <Container text>
        <Dimmer active inverted>
          <Loader content='Loading' />
        </Dimmer>
      </Container>
  }
}

export default App
