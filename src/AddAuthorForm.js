import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import "./AddAuthorForm.css";

class AuthorForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: '',
      imageURL: '',
      boookTemp : '',
      books : []
    };
    this.onFieldChange= this.onFieldChange.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.onAddHandler= this.onAddHandler.bind(this);
  }
  onFieldChange(event){
    this.setState({
      [event.target.name] : event.target.value
    });
  }
  handleSubmit(event){
    event.preventDefault();
    this.props.onAddAuthor(this.state);
  }
  onAddHandler(event){
    this.setState({
      books : this.state.books.concat([this.state.bookTemp]) ,
      bookTemp : ''
    });
  }
  render(){
    return <form onSubmit={this.handleSubmit}>
    <div className="AddAuthorForm_input">
      <label htmlFor="name">Name</label>
      <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}/>
    </div>
    <div className="AddAuthorForm_input">
      <label htmlFor="imageURL">imageURL</label>
      <input type="text" name="imageURL" value={this.state.imageURL} onChange={this.onFieldChange}/>
    </div>
    <div className="AddAuthorForm_input">
      <label htmlFor="books">Books</label>
      {this.state.books.map((book)=> <p key={book}>{book}</p>)} 
      <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}/>
      <input type="button" value="+" onClick={this.onAddHandler}/>
    </div>
    <input type="submit" value="Add"/>
  </form>
  }
}

function AddAuthorForm({match , onAddAuthor}) {
  return (
    <div className="AddAuthorForm">
      <h1>Add an Author</h1>
      <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>
  );
}
function mapDispatchToProps(dispatch, props){
  return{
    onAddAuthor: (author) => {
      dispatch({type: "ADD_AUTHOR", author: author});
      props.history.push('/');
    }
  };
}
export default withRouter(connect(()=>{}, mapDispatchToProps)(AddAuthorForm));
