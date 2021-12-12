import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { create } from '../../services/medsService.js';

function Create() {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: '',
        description: '',
        imageUrl: ''
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
        console.log(input);

        const newMed = {
            name: input.name,
            description: input.description,
            imageUrl: input.imageUrl
        }

        create(newMed);
        navigate('/');
    }


    return (
        <form className="create">
            <h2>Create Med</h2>
            <div className="mb-3">
                <label htmlFor="medName" className="form-label">Med Name</label>
                <input onChange={handleChange} type="text" name="name" value={input.name} className="form-control" id="medName" aria-describedby="nameHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="medDescription" className="form-label">Description</label>
                <input onChange={handleChange} type="text" name="description" value={input.description} className="form-control" id="medDescription" aria-describedby="nameHelp" />
            </div>
            <div className="mb-3">
                <label htmlFor="medImage" className="form-label">Image</label>
                <input onChange={handleChange} type="text" name="imageUrl" value={input.imageUrl} className="form-control" id="medImage" aria-describedby="nameHelp" />
            </div>

            <button onClick={handleClick} type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default Create;