import React from 'react';
import '../Styles/Button.css';
import {useHistory, Redirect} from 'react-router-dom';
import '../Styles/Menu.css';
function Menu(){
    const history = useHistory();
    // if(!authorized){
    //    <Redirect to="/login" />
    // }
    return(
        <div className="App">
            <div className= "container">
                <button className="menubutton" onClick={()=>{history.push('/save-details')}}>Add Document</button>
            </div>
            <div className= "container">
                <button className="menubutton" onClick={()=>{history.push('/delete-details')}}>Delete Document</button>
            </div>
        </div>
    )
}
export default Menu;