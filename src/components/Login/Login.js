import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Login.css';

import { auth } from '../../firebase.js';
import { login } from '../../services/authService.js';

function Login() {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: '',
        password: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;

        setInput(oldInput => {
            return {
                ...oldInput,
                [name]: value
            }
        })
    }

    const onLoginClick = async (e) => {
        e.preventDefault();

        login(auth, input.email, input.password);
    
        navigate('/');        
    }

    return (
        <form className="login">
            <h2>Login</h2>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input onChange={handleChange} type="email" name="email" value={input.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input onChange={handleChange} type="password" name="password" value={input.password} className="form-control" id="exampleInputPassword1" />
            </div>
            <button onClick={onLoginClick} type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default Login;