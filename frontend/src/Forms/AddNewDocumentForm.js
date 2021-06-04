import React from "react";
import {useState, useMemo} from "react";
import {useHistory, Redirect} from "react-router-dom";
import '../Styles/AddNewDocumentForm.css';
import '../Styles/Input.css';
import '../Styles/Button.css';
import '../Styles/Label.css';
import Axios from 'axios';
import StateSelector from "../Components/SelectUsState";
import Select from 'react-select'
import countryList from 'react-select-country-list';
import '../Styles/CountrySelector.css';

function AddNewDocumentForm(props){
    const history=useHistory();
    const [value, setValue] = useState('');
    const [fname, setfname] = useState('');
    const [mname, setmname] = useState('');
    const [lname, setlname] = useState('');
    const [address, setaddress] = useState('');
    const [country, setcountry] = useState('');
    const [state, setstate] = useState('');
    const [zip, setzip] = useState('');
    const [email, setemail] = useState('');
    const [phone, setphone] = useState('');
    const [height, setheight] = useState('');
    const [weight, setweight] = useState('');
    const [firstname, setfirstname] = useState('');
    const [middlename, setmiddlename] = useState('');
    const [lastname, setlastname] = useState('');
    const [fulladdress, setfulladdress] = useState('');
    const [EMail, setEMail] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [Height, setHeight] = useState('');
    const [Weight, setWeight] = useState('');
    const options = useMemo(() => countryList().getData(), [])
    const url = 'http://localhost:3001';
    const changeHandler = value => {
        setValue(value);
        setcountry(value.value);
    }
    function uploadDocument(){
        console.log({firstname, middlename, lastname, fulladdress, EMail, phonenumber, Height, Weight});
        Axios.post('http://localhost:3001/form/save-details', {
            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            fulladdress: fulladdress,
            email: EMail,
            phone: phonenumber,
            height: Height,
            weight: Weight
        }).then(function(response){
            if (response.data == 'OK'){
                alert("Document Added successfully");
                props.history.push('/menu');
            }else{
                alert("nope");
            }
        });

    };
    function formValidate(e){
        e.preventDefault();
        const errorLine = document.getElementById("error");
        const displayform = document.getElementById("newCanvas2");
        const list = [fname,mname,lname,address,country,state,zip,email,phone,height,weight];
        if(!isEverythingFilled(list)){
            errorLine.style.display = 'block';
            errorLine.textContent = "Fill All the fields";
        }
        else{
            if(!isEmail(email)){ document.getElementById("email").classList.add("red"); errorLine.textContent = "Enter valid Email address"; }
            else {document.getElementById("email").classList.remove("red"); }
            if(!isPhone(phone)) {document.getElementById("phone").classList.add("red"); errorLine.textContent = "Enter valid Phone number";}
            else {document.getElementById("phone").classList.remove("red"); }
            if(!isHeight(height)) {document.getElementById("height").classList.add("red"); errorLine.textContent = "Correct Format of height is feet'inches\" example 5'5\"";}
            else {document.getElementById("height").classList.remove("red"); }
            if(isEmail(email) && isPhone(phone) && isHeight(height)){
                errorLine.style.display = "none";
                displayform.style.display = "block";
                setfirstname(fname);
                setmiddlename(mname);
                setlastname(lname);
                setfulladdress(address + ',' + state + ',' + country + ',' +  zip);
                setphonenumber(phone);
                setEMail(email);
                setHeight(height);
                setWeight(weight);
            }
        };
    }
    function isEmpty(variable){
        if(variable === '') return true;
        else return false;
    }
    function isEverythingFilled(list){
        var count = 0;
        list.forEach(item => {
            if(isEmpty(item)){
                count++;
            } 
        });
        if(count > 0) return false;
        else return true;
    }
    function red(id){
        const element = document.getElementById(id);
        if(element.value === ''){ element.classList.add('red'); return false;}
        else {element.classList.remove('red'); return true;}
    }
    function isEmail(email){
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!regex.test(email)) {
           return false;
        }else{
           return true;
        }
    }
    function isHeight(height){
        var regex = /^[0-9]+ ?(\'|ft|cm|meters|feet|in|inches|\")?( *[1-9]+ ?(\"|inches|in|cm)?)?$/;
        if(!regex.test(height)){
            return false;
        }else{
            return true;
        }
    }
    function isWeight(weight){
        var regex = /^(0|[1-9]\d*)(,\d+)?$/;
        if(!regex.test(weight)){
            return false;
        }else{
            return true;
        }
    }
    function isPhone(phone){
        var regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        if(!regex.test(phone)){
            return false;
        }else{
            return true;
        }
    }
    function isZip(zipcode){
        var regex = /^\d{5}$|^\d{5}-\d{4}$/;
        if(!regex.test(zipcode)){
            return false;
        }else{
            return true;
        }
    }
    return (
        <div className="App">
            <form onSubmit={formValidate}>
                <div className="newCanvas">
                <p className="error" id="error">Please fill all the fields</p>
                    <div className="AddNewDocumentForm row">
                        <div className="leftSide col-md-6">
                            <input type="text" placeholder="First Name" id="fname"  onChange={(event)=>{setfname(event.target.value);}}></input>
                            <input type="text" placeholder="Middle Name" id="mname" onChange={(event)=>{setmname(event.target.value);}}></input>
                            <input type="text" placeholder="Last Name" id="lname" onChange={(event)=>{setlname(event.target.value);}}></input>
                            <input type="text" placeholder="Address" id="address" onChange={(event)=>{setaddress(event.target.value);}}></input>
                            <Select id="country" options={options} value={value} onChange={changeHandler} placeholder="Country" />
                        </div>
                        <div className="rightSide col-md-6">
                            <StateSelector country = {country} onState={setstate}/>
                            <input type="text" placeholder="Zip code" id="zip" onChange={(event)=>{setzip(event.target.value);}}></input>
                            <input type="email" placeholder="Email" id="email" onChange={(event)=>{setemail(event.target.value);}}></input>
                            <input type="text" placeholder="Phone" id="phone" onChange={(event)=>{setphone(event.target.value);}}></input>
                            <div className="smallInput">
                                <input type="text" className="height" placeholder="Height" id="height" onChange={(event)=>{setheight(event.target.value);}}></input>
                                <input type="Number" className="weight" placeholder="Weight" id="weight" onChange={(event)=>{setweight(event.target.value);}}></input>
                            </div>
                            <button type="submit" className="savebutton">Save</button>
                        </div>
                    </div>
                </div>   
            </form>
            <div className="newCanvas2" id="newCanvas2">
                <div className="spacer"></div>
                <div className="AddNewDocumentForm row">
                    <div className="leftSide col-md-6">
                        <label>First name: {firstname}</label>
                        <label>Middle Name: {middlename}</label>
                        <label>Last Name: {lastname}</label>
                        <label>E-mail: {EMail}</label>
                    </div>
                    <div className="rightSide col-md-6">
                        <label className="addr">Address: {fulladdress}</label>
                        <label>Phone: {phonenumber}</label>
                        <div className="smallInput">
                            <label className="height">Height: {Height} feet</label>
                            <label className="weight">Weight: {Weight} Kgs</label>
                        </div>
                        <button type="submit" onClick={uploadDocument} className="savebutton">Upload</button>
                    </div>
            </div>
        </div>   
        </div>
        
    );
}

export default AddNewDocumentForm;