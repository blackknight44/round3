import React from "react";
import {useState} from "react";
import {Redirect, useHistory} from 'react-router-dom';
import Axios from 'axios';
import '../Styles/Input.css';
import '../Styles/Button.css';
import '../Styles/LoginForm.css';
import Menu from "../Components/Menu";


function LoginForm(props){
    const [data, setData] = React.useState('');
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const url = 'http://localhost:3001';
    async function onSubmit(e){

        e.preventDefault();
        let response = ()=>{
            return new Promise(function (resolve, reject){
                Axios.post(url+'/login', {
                    username: username,
                    password: password
                }).then(response =>{
                    resolve(response);
                });
            });
        };
        try{
            const responseData = await response();
            if(responseData.data == 'OK'){
                props.history.push('/menu');
            }else{
                alert('nope');
            }
        }catch(e){
            alert(e.message);
        }
    };
    

    return(
        <div className="App">
            <p className="loginerrortext" id="loginerrortext">Invalid Username or Password</p>
            <form onSubmit = {onSubmit} className="container">
            
            <input type="text" placeholder="Username" id="uname" onChange={(event)=>{setUsername(event.target.value);}} value={username}></input>
            <input  type="password" placeholder="Password" id="pass" onChange={(event)=>{setPassword(event.target.value)}} value={password}/>
            <button type="submit">Login</button>
        </form>
        </div>
        
    )
}

export default LoginForm;