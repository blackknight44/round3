const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());



try{
    mongoose.connect("mongodb://localhost:27017/round3",{useFindAndModify: true, useUnifiedTopology: true});
}catch(e){
    console.log(e);
}
const loginSchema = {
    username : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    }
};
const formSchema = {
    firstname: String,
    middlename: String,
    lastname: String,
    address: String,
    phone: String,
    email: String,
    height: String,
    weight: String
};
const Form = mongoose.model('form', formSchema);
const Login = mongoose.model('login', loginSchema);

 if(Login.findOne({username: "admin"}).then(response =>{
         if(!response){
            const log = new Login({
                username: "admin",
                password: "admin"
            });
            try{
                log.save();
            }catch(e){
                console.log(e);
            }
        }
    }));

app.get('/',function (req, res){
   res.sResend("Backend");
});

app.post('/login', function (req, res){
    const username = req.body.username;
    const password = req.body.password;
    Login.findOne({username: username}).then(response =>{
        if(!response){
            console.log("Invalid username");
            
        }else{
            if(password == response.password){
                console.log(response);
                res.sendStatus(200);
                console.log("Logged in");
            }else{
                console.log("Invalid password");
            }
        }
    })
});

app.post('/form/save-details', function (req, res){
    console.log(req.body);
    const form = new Form({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
        address: req.body.fulladdress,
        email: req.body.email,
        phone: req.body.phone,
        height: req.body.height,
        weight: req.body.weight
    });
    try{
        form.save();
        res.sendStatus(200);
        console.log("uploaded")
    }catch(e){
        console.log(e.message);
        console.log("erorr0"); 
    }
});

app.post('/form/delete-details', function (req, res){
    const em = req.body.email;
    console.log(em);
    Form.findOne({email: em},function(err,response){
        if(err){
            console.log("error");
        }else{
            if(!response){
                res.send("NO");
                console.log("Document doesn't exist");

            }else{
                const id = response.id;
                console.log(id);
                res.send(id);
            }
        }
    });
});

app.get('/form/delete-details/:text', function (req, res){
    const id = req.params.text;
    console.log(id);
    Form.findByIdAndDelete(id, function(err, response){
        if(err){
            res.status(400).json({message: "error"});
        }else{
            res.sendStatus(200);
            console.log("deleted");
        }
    })
})

app.listen(3001, function(){
    console.log("Server is up...");
})
