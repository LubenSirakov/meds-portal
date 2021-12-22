import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import * as medsService from '../../services/medsService.js';

import { Alert } from 'react-bootstrap';
import './Edit.css';

function Edit() {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');

    const { medId } = useParams();
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: '',
        description: '',
        count: '',
        imgUrl: ''
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return unsubscribe;
    }, [])

    useEffect(() => {
        medsService.getOne(medId)
            .then(res => {
                setInput(res);
            })
    }, []);

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

        const editedMed = {
            name: input.name,
            description: input.description,
            count: input.count,
            imgUrl: input.imgUrl,
            owner: user.uid,
            medId: medId,
            lists: []
        }

        try {
            setError('');

            medsService.edit(editedMed);

        } catch {

            setError('Failed to edit your med :(')
        }

        navigate('/');
    }


    return (
        <form className="create">
            {error && <Alert variant='danger'>{error}</Alert>}
            <h2>Edit Med<img id='form-drug' src='https://cdn-icons.flaticon.com/png/512/3837/premium/3837740.png?token=exp=1640204300~hmac=d2a019bdf675c65aeb4c5909343aab53'/></h2>
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
        </form>
    );
}

export default Edit;