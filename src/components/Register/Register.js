import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { useNavigate } from 'react-router-dom';

import './Register.css';

function Register() {
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

    const register = async (e) => {
        e.preventDefault();

        try {
            const user = await createUserWithEmailAndPassword(auth, input.email, input.password);
            console.log(user);
            console.log('registered');
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <form className="register">
            <h2>Register</h2>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input onChange={handleChange} type="email" name="email" value={input.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input onChange={handleChange} type="password" name="password" value={input.password} className="form-control" id="exampleInputPassword1" />
            </div>
            <button onClick={register} type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default Register;