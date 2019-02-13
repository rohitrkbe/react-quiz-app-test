import React from "react";
import $ from 'jquery' ;
import QuizContent from './quizContent';

class QuizHeader extends React.Component{
  render(){
    return(
      <header>
        <h2>React - Bsic Quiz Application</h2>
      </header>
    );
  }
}

export default class Layout extends React.Component{
  constructor(props){
    super(props);
    this.state={
      quizQuestion:{},
      quizCount: 0,
      score: 0
    }
  }
  componentDidMount(){
    $.getJSON("../../questionData/question.json", function(result) {
      this.setState({quizQuestion: result.quiz});
    }.bind(this))
  }
  getNextQuestion(){
    this.setState({quizCount: this.state.quizCount + 1});
  }
  incrementScore(){
    this.setState({score: this.state.score + 1});
  }
  render(){
    let { quizCount, score } = this.state;
    let content= null;
    if(quizCount < this.state.quizQuestion.length){
      content = 
        <QuizContent currentQuiz={this.state.quizQuestion[quizCount]}
        getNextQuestion= {this.getNextQuestion.bind(this)}
        incrementScore={this.incrementScore.bind(this)}/>
    } else{
      content = 
      <div>
        <p class="class_score">Your score is : {score}</p>
        <p class="class_score">You answered {score} answers correct out of {this.state.quizQuestion.length} questions.</p>
        <p class="class_score">Currently list of correct and wrong answers have not been displayed as passing props 
        from child to parent directly is not advised.<br/>It can be done easily if we use any state-management library like redux.</p>

        <br/>
        <br/>
        <p>link to repo: <a  href="https://github.com/rohitrkbe/react-quiz-app-test.git" >github</a></p>
      </div>
    }
    return(
      <div>
        <QuizHeader />
        {content}
      </div>
      );
  }
}