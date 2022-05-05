import './App.css';
import {useEffect, useReducer} from 'react';
import Login from './Login';
import {fetchAddTodo, fetchDeleteTodo, fetchUpdateTodo, fetchTodos, fetchSession, fetchLogout} from './services';
import {reducer, initialState, setErrorAction, setUsernameAction, setTodoListsAction, setTodoAction, setRefreshAction} from './reducer';
import loginContext from "./loginContext";

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(
      () => {
        fetchSession()
            .then(
                loadedUsername => {
                  dispatch(setUsernameAction(loadedUsername.username));
                  dispatch(setErrorAction(`Welcome ${loadedUsername.username}`))
                  fetchTodos()
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
      <>
        <div className="Status">{ state.error }</div>
        { !state.username &&
            <loginContext.Provider value={{ onLogin, onError }}>
                <Login/>
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
                    <li key={`${todo.id}`}>
                      <label>
                        <input
                            className="todo__toggle"
                            type="checkbox"
                            onChange={() => {
                              fetchUpdateTodo(todo.id, {done: !todo.done})
                                  .then( updatedTodo => {
                                    state.todoLists[todo.id] = updatedTodo;
                                    dispatch(setRefreshAction(!state.refresh));
                                  })
                            }}
                            checked={todo.done}
                        />
                        <span
                            data-id={`${todo.id}`}
                            className="todo__toggle todo__text"
                        >{todo.task}</span>
                      </label>
                      <button
                          className="todo__delete"
                          onClick={() => {
                            fetchDeleteTodo(todo.id)
                                .then(() => {
                                  dispatch(setRefreshAction(!state.refresh))
                                })
                          }}
                      >&#10060;</button>
                    </li>
                );
              })}
              <input onChange={(e) => dispatch(setTodoAction(e.target.value))} value={state.todo}/>
              <button onClick={() => {
                fetchAddTodo(state.todo)
                    .then( addedTodo => {
                      state.todoLists[addedTodo.id] = addedTodo;
                      dispatch(setTodoAction(''))
                      dispatch(setRefreshAction(!state.refresh))
                    })
              }} disabled={!state.todo}>Add</button>
            </ul>
        ) }
      </>
  );
}

export default App;