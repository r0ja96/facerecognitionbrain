import { Component } from "react";
import './Register.css';

class Register extends Component{

    constructor(props){
        super(props);
        this.state ={
            email:'',
            password: '',
            name:''
        }
    }

    onEmailChange= (event) =>{
        this.setState({email: event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({password: event.target.value});
    }

    onNameChange = (event) =>{
        this.setState({name: event.target.value});
    }

    onSubmitSignIn = () =>{
        console.log('register.js',this.state);
        this.props.loadUser(this.state);
        fetch('http://localhost:3000/register',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        }).then(response => response.json())
        .then(user => {
            if(user){
            this.props.onRouteChange('home');
            this.props.loadUser(user);
            console.log(user);
        }
        });
    }



 render(){
    
    return(
        <div>
            <div>
                <label htmlFor ='name'>Name</label>
                <input id='name' type='text' onChange = {this.onNameChange}/>
                <label htmlFor='email' >Email</label>
                <input id='email' type='text' onChange = {this.onEmailChange}/>
                <label htmlFor='password'>Password</label>
                <input id='password' type='text' onChange = {this.onPasswordChange}/>
                <input onClick={this.onSubmitSignIn} type='submit' value='Register'/>
               
            </div>
        </div>
    );
}
}


export default Register;