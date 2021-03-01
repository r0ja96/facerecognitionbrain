import React,{Component} from 'react';
import './SignIn.css';

class SignIn extends React.Component{

    constructor(props){
        super(props);
        this.state ={
            SignInEmail:'',
            SignInPassword: ''
        }
    }

    onEmailChange= (event) =>{
        this.setState({SignInEmail: event.target.value});
    }

    onPasswordChange = (event) =>{
        this.setState({SignInPassword: event.target.value});
    }

    onSubmitSignIn = () =>{
        console.log(this.state.SignInEmail,this.state.SignInPassword);
        fetch('http://localhost:3000/signin',{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                email: this.state.SignInEmail,
                password: this.state.SignInPassword
            })
        }).then(response => response.json())
        .then(user => {
            if( user.id){
            this.props.loadUser(user);    
            this.props.onRouteChange('home');
            }
        });
    }

render(){
    const {onRouteChange} = this.props;

    return(
        <div>
            <div>
                <label htmlFor='email'>Email</label>
                <input onChange={this.onEmailChange} id='email' type='text'/>
                <label htmlFor='password'>Password</label>
                <input onChange={this.onPasswordChange} id='password' type='text'/>
                <input onClick={this.onSubmitSignIn} type='button' value='Sign In'/>
                <p onClick={() => onRouteChange('register')}>Register</p>
            </div>
        </div>
    );
}
}


export default SignIn;