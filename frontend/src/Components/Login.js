import React from 'react'
import '../Styles/Button.css';
import {useHistory} from 'react-router-dom';

function Login() {
    const history = useHistory();
    return (
        <div className="App">
            <button onClick={()=>{history.push("/login")}}>Login</button>
        </div>
    )
}

export default Login
