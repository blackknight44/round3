import React from "react";
import '../Styles/Label.css';

function Label(props){
    return (
        <label>{props.name}: {props.value}</label>
    );
}
export default Label;