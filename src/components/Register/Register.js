import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { register } from '../../services/authService.js';

import { Alert } from 'react-bootstrap';
import './Register.css';

const Register = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, []);

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
    };

    const onRegisterClick = (e) => {
        e.preventDefault();

        if (!input.email) {
            return setError('Email field cannot be empty!')
        }

        if (!input.password) {
            return setError('Password field cannot be empty!')
        }


        if (input.password.length < 6) {
            return setError('Password must be at least 6 charactes long');
        }

        let emailRegEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!input.email.match(emailRegEx)) {
            return setError('Email address must be the following format example@gmail.com')
        }

        try {
            setError('');

            register(auth, input.email, input.password)
                .then(authData => {
                    register(authData);

                    navigate('/')
                })
                .catch(error => {

                    setError(error.message);
                })

        } catch (error) {
            setError(error)
        }
    };

    return (
        <div className="form-wrapper">
            <form className="register">
                <h2>Register<img id='register-drug' src='https://cdn-icons-png.flaticon.com/512/1546/1546140.png'/></h2>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                    <input onChange={handleChange} type="email" name="email" value={input.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={handleChange} type="password" name="password" value={input.password} className="form-control" id="exampleInputPassword1" />
                </div>
                <button onClick={onRegisterClick} type="submit" className="btn btn-primary">Submit</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
                {error && <Alert variant='danger'>{error}</Alert>}
            </form>
        </div>
    );
}

export default Register;