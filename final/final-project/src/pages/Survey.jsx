import React from 'react'
import '../CSS/Survey.css'
import { useEffect, useReducer } from "react";
import {
    fetchAddTodo,
    fetchDeleteTodo,
    fetchUpdateTodo,
    fetchTodos,
    fetchScoreRanking,
    fetchDeleteSurvey,
    fetchSession,
    fetchLogout,
    fetchAddSurvey
} from '../services';
import {reducer, initialState, setErrorAction, setUsernameAction, setTodoListsAction, setTodoAction, setRefreshAction} from '../reducer';
import loginContext from "../loginContext";
import Loginform from "./Loginform";
import {fetchSurveys} from '../services'




function Login(){
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(
        () => {
            fetchSession()
                .then(
                    loadedUsername => {
                        dispatch(setUsernameAction(loadedUsername.username));
                        dispatch(setErrorAction(`Welcome ${loadedUsername.username}`))
                        fetchSurveys()
                            .then(rawTodos => {
                                dispatch(setTodoListsAction(rawTodos))
                            })
                            .catch( error => {
                                dispatch(setErrorAction("Loading List failed"))
                            })
                    }
                )
                .catch( error => {
                    if(error.error === "auth-missing") dispatch(setErrorAction("Please login firstly"));
                })
        },
        [state.username, state.refresh]
    )

    if(state.error.error === "auth-insufficient") {
        dispatch(setErrorAction("Invalid Username, Please try again"));
        dispatch(setUsernameAction(''));
    }

    function onLogin(username) {
        dispatch(setUsernameAction(username));
    }

    function onError(error) {
        dispatch(setErrorAction(error));
    }


    return (
        <div className="application">
            <div className="Status">{ state.error }</div>
            { !state.username &&
                <loginContext.Provider value={{ onLogin, onError }}>
                    <Loginform/>
                </loginContext.Provider>
            }
            { state.todoLists && (
                <ul className="todos">
                    <div className="controls">
                        <button className="refresh" onClick={ () => {
                            dispatch(setRefreshAction(!state.refresh))
                        }}>Refresh</button>
                        <button className="logout" onClick={ () => {
                            fetchLogout()
                                .then(() => {
                                    dispatch(setUsernameAction(''))
                                    dispatch(setTodoListsAction(''))
                                })
                        }}>Logout</button>
                    </div>
                    { Object.values(state.todoLists).map( todo => {
                        return (
                            <li className="ranking" key={`${todo.id}`}>
                                <label>
                                    <span
                                        data-id={`${todo.id}`}
                                        className="todo__toggle todo__text"
                                    >{todo.course}</span>
                                </label>
                                <div className="score">
                                    <span className="star" data-starid="1" data-rankingid={todo.id} onClick={() => {
                                        fetchScoreRanking(todo.id, {score: 1})
                                            .then(() => {
                                                dispatch(setRefreshAction(!state.refresh))
                                            })
                                    }}>{todo.score > 0 ? `★` : `☆`} </span>
                                    <span className="star" data-starid="2" data-rankingid={todo.id} onClick={() => {
                                        fetchScoreRanking(todo.id, {score: 2})
                                            .then(() => {
                                                dispatch(setRefreshAction(!state.refresh))
                                            })
                                    }}>{todo.score > 1 ? `★` : `☆`} </span>
                                    <span className="star" data-starid="3" data-rankingid={todo.id} onClick={() => {
                                        fetchScoreRanking(todo.id, {score: 3})
                                            .then(() => {
                                                dispatch(setRefreshAction(!state.refresh))
                                            })
                                    }}>{todo.score > 2 ? `★` : `☆`} </span>
                                    <span className="star" data-starid="4" data-rankingid={todo.id} onClick={() => {
                                        fetchScoreRanking(todo.id, {score: 4})
                                            .then(() => {
                                                dispatch(setRefreshAction(!state.refresh))
                                            })
                                    }}>{todo.score > 3 ? `★` : `☆`} </span>
                                    <span className="star" data-starid="5" data-rankingid={todo.id} onClick={() => {
                                        fetchScoreRanking(todo.id, {score: 5})
                                            .then(() => {
                                                dispatch(setRefreshAction(!state.refresh))
                                            })
                                    }}>{todo.score > 4 ? `★` : `☆`} </span>
                                </div>
                                <button
                                    className="todo__delete"
                                    onClick={() => {
                                        fetchDeleteSurvey(todo.id)
                                            .then(() => {
                                                dispatch(setRefreshAction(!state.refresh))
                                            })
                                    }}
                                >&#10062;</button>
                            </li>
                        );
                    })}
                    <input onChange={(e) => dispatch(setTodoAction(e.target.value))} value={state.todo}/>
                    <button onClick={() => {
                        fetchAddSurvey(state.todo)
                            .then( addedSurvey => {
                                state.todoLists[addedSurvey.id] = addedSurvey;
                                dispatch(setTodoAction(''))
                                dispatch(setRefreshAction(!state.refresh))
                            })
                    }} disabled={!state.todo}>Add</button>
                </ul>
            ) }
        </div>
    );
}

export default Login;