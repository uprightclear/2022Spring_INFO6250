import { useState, useContext } from 'react';
import { fetchLogin } from '../services';

import loginContext from '../loginContext';

function Loginform() {

    const [name, setName] = useState('');
    const { onLogin, onError } = useContext(loginContext);
    const [isClicked, setIsClicked] = useState(false);
    function toggleClass() {
        console.log("sun")
        setIsClicked(!isClicked);
    }

    return (
        <div className="login">
            {!isClicked &&
                <form>
                    <label><span>Username:</span>
                        <input className="text-input" onChange={(e) => setName(e.target.value)} value={name}/>
                    </label>
                    <label><span>Email:</span>
                        <input className="text-input" type="text" name="email" required/>
                    </label>
                    <label><span>Class:</span>
                        <select name="Class" required>
                            <option value="">Please select</option>
                            <option value="1">Teacher</option>
                            <option value="2">Student</option>
                            <option value="3">Alumni</option>
                        </select>
                    </label>
                    <label><span>I accept the agreement of NEU.</span>
                        <input className="checkbox" type="checkbox" name="annoy_me"/>
                    </label>
                    <button className={isClicked ? "gg-spinner" : ""} onClick={() => {
                        toggleClass()
                        fetchLogin(name)
                            .then(() => {
                                onLogin(name)
                                onError(`Welcome ${name}`)
                            })
                            .catch( error => onError(error));
                    }} disabled={!name}>Login</button>
                </form>
            }
            {isClicked &&
                <div className="loading">
                    <div className="gg-spinner" onClick={toggleClass}></div>
                </div>
            }
        </div>
    );
}

export default Loginform;