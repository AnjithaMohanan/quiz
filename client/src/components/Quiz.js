import React, { useEffect,useState } from 'react';

import  Questions  from './Questions';
import {MoveNextQuestion,MovePrevQuestion} from '../hooks/FetchQuestion';
import {PushAnswer} from '../hooks/setResult';

/** redux store import*/
import {useSelector,useDispatch} from 'react-redux';
import {Navigate} from 'react-router-dom';


export default function Quiz() {
  const [check,setChecked]=useState(undefined)

  const result =useSelector(state => state.result.result)
  const {queue, trace} =useSelector(state => state.questions)
const dispatch =useDispatch()



/**next button event handler */
  function onNext(){
    if(trace < queue.length){
  /**Update the trace value by one using  MoveNextAction*/
  dispatch(MoveNextQuestion());
  
  /**insert a new result in the array */
  if(result.length <= trace){
    dispatch(PushAnswer(check))
  }

}
/** reset the value of variable  */
setChecked(undefined)

  }
  function onPrev(){
    console.log('On onPrev click');
    if(trace >0) {
    dispatch(MovePrevQuestion());
    }

  }
  function onChecked(check){
    console.log(check)
    setChecked(check)
  }

/**finished exam after the last qus*/
if(result.length && result.length >= queue.length){
  return <Navigate to={'/result'} replace="to"></Navigate>

}


  return (
    <div className='container'>
        <h1 className="title text-light">Quiz Application</h1>

        {/* display questions */}

        <Questions onChecked={onChecked}/>
        <div className='grid'>
          {trace > 0 ? <button className='btn prev' onClick={onPrev}>prev</button> : <div></div> }
          {/* <button className='btn prev' onClick={onPrev}>prev</button> */}
          <button className='btn next' onClick={onNext}>Next</button>

        </div>

    </div>
  )
}
