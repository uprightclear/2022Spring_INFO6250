import { useState, useEffect } from 'react';
import {fetchAddTodo, fetchDeleteTodo, fetchUpdateTodo, fetchTodos, fetchSession, fetchLogout, fetchLogin} from './services';


function Login({ setUsername, setError}) {

    const [name, setName] = useState('');

    return (
        <div className="login">
            <span>Username:</span>
            <input onChange={(e) => setName(e.target.value)} value={name}/>
            <button onClick={() => {
                fetchLogin(name)
                .then(() => {
                    setUsername(name)
                    setError(`Welcome ${name}`)
                })
                .catch( error => setError(error));
            }} disabled={!name}>Login</button>
        </div>
    );
}

export default Login;