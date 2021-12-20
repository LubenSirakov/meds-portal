import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { onAuthStateChanged } from 'firebase/auth';
import * as medsService from '../../services/medsService.js';
import { auth } from '../../firebase';

import './Edit.css';

function Edit() {
    const [user, setUser] = useState({});

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

        const editedMed = {
            name: input.name,
            description: input.description,
            count: input.count,
            imgUrl: input.imgUrl,
            owner: user.uid,
            medId: medId
        }
        console.log(editedMed);
        medsService.edit(editedMed);
        navigate('/');
    }


    return (
        <form className="create">
            <h2>Edit Med</h2>
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

            <button onClick={handleClick} type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default Edit;