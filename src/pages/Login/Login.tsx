import './login.scss';
import React, { useState } from 'react';
import { BsEye} from 'react-icons/bs';
import * as thunks from '../../redux/tables/tableThunks.ts';
import { AppDispatch, RootState } from '../../redux/store.ts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 

function Login() {
    const dispatch = useDispatch<AppDispatch>();
    const [item, setItem] = useState({name: "", email: "", password: ""});
    const [showPassword, setShowPassword] = useState(false);
    const error = useSelector((state: RootState) => state.collection.codeStatus);
    const navigate = useNavigate(); 

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const route = `/users/login`;
        const encryptedPassword = btoa(item.password);
        await dispatch(thunks.login({ route, item: {...item, password: encryptedPassword} }));
        setItem({name: "", email: "", password: ""});
        navigate("/")
    };

    return ( 
        <div className='login_container'>
            <h1 className='login_header'>Login</h1>
            <form className='login-form_container'>
                <div className='form_input'>  
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' value={item.name} onChange={(e) => setItem({...item, name: e.target.value})}/>
                </div>
                <div className='form_input'>  
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' value={item.email} onChange={(e) => setItem({...item, email: e.target.value})}/>
                </div>
                <div className='form_input'>  
                    <label htmlFor='password'>Password</label>
                    <BsEye className="toggle_password_button" onClick={togglePasswordVisibility} />
                    <input type={!showPassword ? 'password' : 'input'} id="password" value={item.password} onChange={(e) => setItem({...item, password: e.target.value})}/>
                </div>
                <button type="submit" className="submit_button" onClick={handleSubmit}>Submit</button>
            </form>
            {error && <p className='error'>{error}</p>}
        </div>
     );
}

export default Login;
