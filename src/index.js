import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import Authorquiz from './Authorquiz';
import AddAuthorForm from './AddAuthorForm';
import Result from './Result';
import { BrowserRouter , Route, withRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import {shuffle , sample} from 'underscore';

const authors = [
  {
    name: 'Mark Twain',
    imageURL: 'images/marktwain.jpg',
    imageSource :'Wikipedia Commons',
    books: ['The adventures of Huckleberry Fin' , 'Life of Missipi' , 'Roughing it']
  },
  {
    name: 'Charles Dickens',
    imageURL: 'images/charlesdicken.jpg',
    imageSource :'Wikipedia Commons',
    books: ['David CopperField' , 'A Tale of two Cities' , 'Olivier Twist']
  },
  {
    name: 'William Shakespear',
    imageURL: 'images/shakespeare.jpg',
    imageSource :'Wikipedia Commons',
    books: ['Macbeth' , 'Romeo and Juleit' , 'Hamlet']
  }
]
function getTurnData(authors){
  // concatnates all the books array in into one large array
  const Allbooks = authors.reduce(function (p, c,i) {
     return p.concat(c.books);
  },[]);
  // shuffles the concatnated array and then reduces it to array of length 4
  const fourrandombooks = shuffle(Allbooks).slice(0,4);
  // chooses one random book from the array
  const answer = sample(fourrandombooks);
  // for author we find and author in authors array that has the answer book in its books array
  return {
    books: fourrandombooks,
    author: authors.find(               
      (author) => author.books.some(
        (title) => title === answer
       )
    )
  }
}
const countforstate = 0;
const scoreforstate = 0;
function reducer(state = {authors, turnData: getTurnData(authors), highlight: '', count: countforstate, score: scoreforstate, answers:[]}, action){
  switch(action.type){
    case "ANSWER_SELECTED":
      const iscorrect = state.turnData.author.books.some((book) => book === action.answer);
      return  Object.assign({}, state, {highlight: '', 
                                        turnData:getTurnData(state.authors), 
                                        count: state.count+1,
                                        score: state.score + 1 
                                      } );
    case "FINISH":
      window.location.href = "/result";
      return state;
    case "ADD_AUTHOR":
        return Object.assign({}, state, {authors: state.authors.concat(action.author)});
    default: return state;
  }
}

let store = Redux.createStore(reducer);


// this component is called when url is"/" and this component has a whole tree of components
// this component is called when url is"/add" and is used to go to form for adding and author. the form is defined under this component
//withrouter is used to push url back to "/" url after addauthor button is clicked
// broweser router is the react element used to add routing

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ReactRedux.Provider store = {store}>  
        <React.Fragment>
          <Route exact path = "/"  component={Authorquiz}/>
          <Route path = "/add" component={AddAuthorForm}/>
          <Route path = "/result" component={Result}/>
        </React.Fragment>
      </ReactRedux.Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);  



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
