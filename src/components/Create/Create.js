import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { create } from '../../services/medsService.js';
import uniqid from 'uniqid';

import { Alert } from 'react-bootstrap';
import './Create.css';

function Create() {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return unsubscribe;
    }, [])

    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: '',
        description: '',
        count: '',
        imgUrl: ''
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

    function handleClick(e) {
        e.preventDefault();

        if (!input.name) {
            return setError('Med Name field cannot be empty!')
        }

        if (input.name.length < 5) {
            return setError('Med Name must be at least 5 characters long!')
        }

        if (!input.description) {
            return setError('Description field cannot be empty!')
        }

        if (!input.count) {
            return setError('You must input the count of tablets. If it is in a different form input 1.')
        }

        if (!input.imgUrl) {
            return setError('Please provide a image url to the med!')
        }

        const newMed = {
            name: input.name,
            description: input.description,
            count: input.count,
            imgUrl: input.imgUrl,
            owner: user.uid,
            medId: uniqid(),
            lists: [],
        }

        try {
            setError('');

            create(newMed);

        } catch {

            setError('Failed to create new med :(');

        }

        navigate('/');
    }


    return (
        <>
            {user
                ? (<form className="create">
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <h2>Create Med<img id='form-drug' src='https://cdn-icons.flaticon.com/png/512/3837/premium/3837740.png?token=exp=1640204300~hmac=d2a019bdf675c65aeb4c5909343aab53'/> </h2>
                    <div className="mb-3">
                        <label htmlFor="medName" className="form-label">Med Name</label>
                        <input onChange={handleChange} type="text" name="name" value={input.name} className="form-control" id="medName" aria-describedby="nameHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="medDescription" className="form-label">Description</label>
                        <textarea onChange={handleChange} type="text" name="description" value={input.description} className="form-control" id="medDescription" aria-describedby="nameHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="medCount" className="form-label">Count of tablets</label>
                        <input onChange={handleChange} type="text" name="count" value={input.count} className="form-control" id="medCount" aria-describedby="nameHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="medImage" className="form-label">Image</label>
                        <input onChange={handleChange} type="text" name="imgUrl" value={input.imgUrl} className="form-control" id="medImage" aria-describedby="nameHelp" />
                    </div>

                    <button onClick={handleClick} type="submit" className="submit">Submit</button>
                </form>)
                : navigate('/login')
            }
        </>
    );
}

export default Create;