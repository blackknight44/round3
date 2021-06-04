import React from "react";
import {useState} from "react";
import '../Styles/LoginForm.css';
import Axios from 'axios';

function DeleteDocumentForm(props){
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    async function onSubmit(e){
        e.preventDefault();
    let response = ()=>{
        return new Promise(function (resolve, reject){
            Axios.post('http://localhost:3001/form/delete-details',{
                email: email
            }).then(response=>{
                resolve(response);
            });
        });
    };
    let responseData = await response();
    if(responseData.data == 'NO'){
        alert("Document doesn't Exist!");
    }else{
        const id = responseData.data
        setId(id);
    }
    let res = ()=>{
        return new Promise(function (resolve, reject){
            Axios.get('http://localhost:3001/form/delete-details/'+id).then(res =>{
                resolve(res);
            });
        });
    };
    let resData = await res();
    if(resData.data == 'OK'){
        alert("Document deleted Successfully!");
        props.history.push('/menu');
    }else{
        alert("Nope");
    }
    };
    return (
        <form onSubmit = {onSubmit} className="container App">
            <input type="email" placeholder="Enter email to delete" id="email" onChange={(event)=>{setEmail(event.target.value);}} value={email}></input>
            <button type="submit">Delete</button>
        </form>
    )
}
export default DeleteDocumentForm;