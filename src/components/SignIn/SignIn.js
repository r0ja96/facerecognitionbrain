import './SignIn.css';

const SignIn = ({onRouteChange})=>{

    return(
        <div>
            <form>
                <label htmlFor='email'>Email</label>
                <input id='email' type='text'/>
                <label htmlFor='password'>Password</label>
                <input id='password' type='text'/>
                <input onClick={() => onRouteChange('home')} type='button' value='Sign In'/>
                <p onClick={() => onRouteChange('register')}>Register</p>
            </form>
        </div>
    );
}


export default SignIn;