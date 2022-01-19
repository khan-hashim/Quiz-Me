import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state){
    return{
        score: state.count
    }
}
const mapDispatchToProps = () => {}
const Result = connect(mapStateToProps , mapDispatchToProps)(
    function ({score}){
        return (
            <div><h1>{score}</h1></div>
        );
    }
)
        


export default Result;