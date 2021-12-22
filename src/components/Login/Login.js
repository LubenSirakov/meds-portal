import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { auth } from '../../firebase.js';
import { login } from '../../services/authService.js';

import { Alert } from 'react-bootstrap';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

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

    const onLoginClick = (e) => {
        e.preventDefault();

        if (!input.email) {
            return setError('Email field cannot be empty!')
        }

        if (!input.password) {
            return setError('Password field cannot be empty!')
        }

        try {
            setError('');

            login(auth, input.email, input.password)
                .then(authData => {
                    login(authData);

                    navigate('/')
                })
                .catch(error => {

                    setError(error.message);
                })

        } catch (error) {

            setError(error)
        }
    }

    return (
        <form className="login">
            <h2>Login<img id='login-drug' src='https://cdn-icons-png.flaticon.com/512/1546/1546140.png'/></h2>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input onChange={handleChange} type="email" name="email" value={input.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input onChange={handleChange} type="password" name="password" value={input.password} className="form-control" id="exampleInputPassword1" />
            </div>
            <button onClick={onLoginClick} type="submit" className="btn btn-primary">Submit</button>
            <p>New here? <Link to="/register">Register</Link></p>
            {error && <Alert variant='danger'>{error}</Alert>}
        </form>
    );
}

export default Login;