import React from 'react';
import {useState} from 'react';
import {parse, stringify} from 'flatted';
import SelectUsState from 'react-select-us-states';
import '../Styles/Input.css';
import '../Styles/SelectUsState.css';

function StateSelector(props){
    const country = props.country;
    const [value, setValue] = useState('')
    // const options = useMemo(() => countryList().getData(), [])

    const changeHandler = value => {
        setValue(value);
        props.onState(value);
    }
    return (
        (country === 'US') ? 
        <SelectUsState id="USstates" classNames="USstates" onChange={changeHandler}/>
        : <input id="USstates" type="text" onChange={(event) => {props.onState(event.target.value)}} placeholder="State"></input>
    )
}

export default StateSelector;