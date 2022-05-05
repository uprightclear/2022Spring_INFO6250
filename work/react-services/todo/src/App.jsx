import './App.css';
import { useState, useEffect } from 'react';
import Login from './Login';
import {fetchAddTodo, fetchDeleteTodo, fetchUpdateTodo, fetchTodos, fetchSession, fetchLogout, fetchLogin} from './services';

function App() {

    const [error, setError] = useState("");
    const [username, setUserName] = useState();
    const [todoLists, setTodoLists] = useState();
    const [todo, setTodo] = useState();
    const [refresh, setRefresh] = useState(false);

    useEffect(
        () => {
            fetchSession()
            .then(
                loadedUsername => {
                    setUserName(loadedUsername.username);
                    setError(`Welcome ${loadedUsername.username}`)
                    fetchTodos()
                    .then(rawTodos => {
                        setTodoLists(rawTodos);
                    })
                    .catch( error => {
                        setError("Loading List failed")
                    })
                }
            )
            .catch( error => {
                if(error.error === "auth-missing") setError("Please login firstly");
            })
        },
        [username, refresh]
    )

    if(error.error === "auth-insufficient") {
        setError("Invalid Username, Please try again");
        setUserName("");
    }

    return (
        <>
        <div className="Status">{ error }</div>
        { !username && <Login setUsername={setUserName} setError={setError}/> }
        { todoLists && (
            <ul className="todos">
                <div className="controls">
                    <button className="refresh" onClick={ () => {
                        setRefresh(!refresh)
                    }}>Refresh</button>
                    <button className="logout" onClick={ () => {
                        fetchLogout()
                        .then(() => {
                            setUserName("")
                            setTodoLists()
                        })
                    }}>Logout</button>
                </div>
                { Object.values(todoLists).map( todo => {
                    return (
                        <li key={`${todo.id}`}>
                            <label>
                                <input
                                    className="todo__toggle"
                                    type="checkbox"
                                    onChange={() => {
                                        fetchUpdateTodo(todo.id, {done: !todo.done})
                                        .then( updatedTodo => {
                                            todoLists[todo.id] = updatedTodo;
                                            setRefresh(!refresh);
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
                                        setRefresh(!refresh);
                                    })
                                }}
                            >&#10060;</button>
                        </li>
                    );
                })}
                <input onChange={(e) => setTodo(e.target.value)} value={todo}/>
                <button onClick={() => {
                    fetchAddTodo(todo)
                        .then( addedTodo => {
                            todoLists[addedTodo.id] = addedTodo;
                            setTodo('')
                            setRefresh(!refresh)
                        })
                }} disabled={!todo}>Add</button>
            </ul>
        ) }
        </>
    );
}

export default App;
