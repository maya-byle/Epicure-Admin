import './login.scss';
import React, { useState } from 'react';
import { BsEye} from 'react-icons/bs';

function Login() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return ( 
        <div className='login_container'>
            <h1 className='login_header'>Login</h1>
            <form className='login-form_container'>
                <div className='form_input'>  
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='form_input'>  
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='form_input'>  
                    <label htmlFor='password'>Password</label>
                    <BsEye className="toggle_password_button" onClick={togglePasswordVisibility} />
                    <input type={showPassword ? 'password' : 'input'} id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="submit_button">Submit</button>
            </form>
        </div>
     );
}

export default Login;
