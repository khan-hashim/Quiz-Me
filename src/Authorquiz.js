import logo from './logo.svg';
import './App.css';
import './bootstrap.min.css';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

function Book({title , onClick}){
  return(
    <div className="answer" onClick= {() => {onClick(title);}}>
      <h4>{title}</h4>
    </div>
  )
}
function Turn({author , books , highlight, onanswerSelected}){
  function highlighttoBGcolor(highlight){
    const mapping = {
      'none':'' ,
      'correct' : 'green' ,
      'wrong' : 'red'
    }
    return mapping[highlight];
  } 
  return(
    <div className="row turn" style = {{backgroundColor : highlighttoBGcolor(highlight)}}>
      <div className="col-3 offset-1">
        <img src={author.imageURL} className="authorimage" alt="Author"/>
      </div>
      <div className="col-4">
        {books.map((title) => < Book title={title} key={title} onClick={onanswerSelected}/>)}
      </div>
    </div>
  );
}
// component for Top heading
function Hero(){
  return(
    <div className="row hero">
      <div className="jumbotron col-8 offset-1"> 
        <h1>Author quiz</h1>
        <p>Select the writer whose picture is shown</p>
      </div>
    </div>
  );
}
function Continue({count , onFinish}){
  return(
    <div className="row continue">
      {count===10 
        ? <div className="col-12">
            <button className="btn btn-primary btn-lg float-right" onClick={onFinish}>Finish</button>
          </div>
    : null
    }
  </div>
  );
}
function mapStateToProps(state){
  return{
    turnData : state.turnData,
    highlight : state.highlight,
    count: state.count
  };
}
function mapDispatchToProps(dispatch){
  return{
    onanswerSelected: (answer) =>{
      dispatch({type: "ANSWER_SELECTED" , answer: answer});
    },
    onFinish: () => {
      dispatch({type: "FINISH"});
    }
  };
}
const AuthorQuiz = connect(mapStateToProps , mapDispatchToProps)(
  function({turnData , highlight, count , onanswerSelected , onFinish}) {
    return (
      <div className="container-fluid">
        <Hero/>
        <Turn {...turnData}  highlight = {highlight} onanswerSelected={onanswerSelected}/>
        <Continue count={count} onFinish={onFinish}/>
        <p> <Link to="/add">Add an author</Link></p>
      </div>
    );
  }
)


export default AuthorQuiz;
