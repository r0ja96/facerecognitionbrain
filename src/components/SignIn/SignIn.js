import './SignIn.css';

const SignIn = ({onRouteChange})=>{

    return(
        <div>
            <form>
                <label>Email</label>
                <input type='text'/>
                <label>Password</label>
                <input type='text'/>
                <a onClick={() => onRouteChange('Home')}>Register</a>
            </form>
        </div>
    );
}


export default SignIn;