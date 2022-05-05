import { useState, useContext } from 'react';
import { fetchLogin } from './services';

import loginContext from './loginContext';

function Login() {

    const [name, setName] = useState('');
        const { onLogin, onError } = useContext(loginContext);
    return (
        <div className="login">
            <span>Username:</span>
            <input onChange={(e) => setName(e.target.value)} value={name}/>
            <button onClick={() => {
                fetchLogin(name)
                    .then(() => {
                        onLogin(name)
                        onError(`Welcome ${name}`)
                    })
                    .catch( error => onError(error));
            }} disabled={!name}>Login</button>
        </div>
    );
}

export default Login;