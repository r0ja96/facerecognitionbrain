import './Register.css';

const Register = ({onRouteChange})=>{

    return(
        <div>
            <form>
                <label htmlFor ='name'>Name</label>
                <input id='name' type='text'/>
                <label htmlFor='email' >Email</label>
                <input id='email' type='text'/>
                <label htmlFor='password'>Password</label>
                <input id='password' type='text'/>
                <input onClick={() => onRouteChange('home')} type='submit' value='Register'/>
               
            </form>
        </div>
    );
}


export default Register;