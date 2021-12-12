import { useState } from 'react';
// import * as medsService from '../../services/medsService.js';
import axios from 'axios';


function Create() {
    const [input, setInput] = useState({
        name: '',
        description: '',
        image: ''
    });

    function handleChange(e) {
        const {name, value} = e.target;

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
            image: input.image
        }

        axios.post('http://localhost:5000/create', newMed);
    }

    // const onMedCreate = (e) => {
    //     e.preventDefault();

    //     let formData = new FormData(e.currentTarget);

    //     let name = formData.get('name');
    //     let description = formData.get('description');
    //     let image = formData.get('image');

    //     // console.log(name, description, image);
    //     medsService.create({
    //         name,
    //         description,
    //         image
    //     })
    //     .then(result => {
    //         navigate('/');
    //     })
    // }

    return (
        <form className="create">
            <h2>Create Med</h2>
            <div className="mb-3">
                <label for="medName" className="form-label">Med Name</label>
                <input onChange={handleChange} type="text" name="name" value={input.name} className="form-control" id="medName" aria-describedby="nameHelp" />
            </div>
            <div className="mb-3">
                <label for="medDescription" className="form-label">Description</label>
                <input onChange={handleChange} type="text" name="description" value={input.description} className="form-control" id="medDescription" aria-describedby="nameHelp" />
            </div>
            <div className="mb-3">
                <label for="medImage" className="form-label">Image</label>
                <input onChange={handleChange} type="text" name="image" value={input.image} className="form-control" id="medImage" aria-describedby="nameHelp" />
            </div>

            <button onClick={handleClick} type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
}

export default Create;