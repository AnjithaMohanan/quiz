/**fetch qustion hook  to fetch api data and set value to store */

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"


/**redux actions */
import *as Action from '../redux/question_reducer'
import { getServerData } from "../helper/helper";

export const useFetchQuestion =() =>{
    const dispatch =useDispatch();
   const [getData,setGetData]= useState({isLoading: false, apiData:[],serverError:null})

useEffect(() => {
    setGetData(prev => ({...prev, isLoading: true}));
    /**async fun fetch backend data */
    
    (async () => {
        try {
           const [{questions, answers}] =await getServerData(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,(data)=>data)
console.log({questions, answers})


            if (questions.length > 0) {
                setGetData(prev => ({...prev, isLoading: false}));
                setGetData(prev => ({...prev, apiData: {questions}}));
                /**dispatch an action */
                dispatch(Action.startExamAction({question:questions, answers}));
            } else {
                throw new Error("No Question Available");
            }
        } catch (error) {
            setGetData(prev => ({...prev, isLoading: false}));
            setGetData(prev => ({...prev, serverError: error}));
        }
    })();
}, [dispatch]);

return[getData,setGetData]

}

/**moveAction dispatch fun */
export const MoveNextQuestion = () =>async (dispatch)=>{
    try{
dispatch(Action.moveNextAction())

    }catch(error){
        console.log(error);

    }
}
/**prevAction dispatch fun */
export const MovePrevQuestion = () =>async (dispatch)=>{
    try{
dispatch(Action.movePrevAction())

    }catch(error){
        console.log(error);

    }
}