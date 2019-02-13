import React from "react";

export default class QuizContent extends React.Component{
    constructor(props){
      super(props);
      this.state= {
      }
    }
    clickSubmit(){
      let { currentQuiz }= this.props;
      let userChoice = document.querySelector('input[name="choices"]:checked');
      var ele = document.getElementsByName('choices');
      for(var i= 0;i < ele.length; i++){
        ele[i].disabled= true;
      }
      if(userChoice){
        userChoice = Number(userChoice.value);
        console.log('correct Answer :',currentQuiz.answer);
        console.log('user selected :',userChoice);
        if(userChoice === currentQuiz.answer){
            console.log('User entered correct answer');
            this.props.incrementScore();
        }else{
            console.log('User entered wrong answer');
        }
      }
      this.nextQuestion();
    }
    nextQuestion(){
      this.props.getNextQuestion();
      var ele = document.getElementsByName('choices');
      for(var i=0; i< ele.length; i++){
        ele[i].checked = false;
        ele[i].disabled = false;
      }
      var arrChoice = document.getElementsByClassName('choice_name');
      for(var i=0; i< arrChoice.length; i++){
        arrChoice[i].style.backgroundColor= "white";
      }
    }
    clickButton(e){
        this.clickSubmit();
    }
    render(){
      let { currentQuiz } = this.props;
      let { ifButtonSubmit } = this.state;
      let buttonText = null;
      return(
        <div class="class_layout">
          {currentQuiz.question}
          <Choices choices={currentQuiz.choices} />
          <button onClick={this.clickButton.bind(this)}>Submit</button>
        </div>
      )
    }
  }
  
  class Choices extends React.Component{
    render(){
      let { choices } = this.props;
      var createChoice = function(choice, index){
        return (
          <div class="div_radio" key={index}>
            <input name="choices" value={index} type="radio" />
            <label class="choice_name" id={index}>{choice}</label>
            <br/>
          </div>
        );
      };
      return (
        <div>
          {choices.map(createChoice)}
        </div>
      );
    }
  }