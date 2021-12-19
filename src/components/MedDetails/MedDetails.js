import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import * as medsService from '../../services/medsService';

function MedDetails() {
    const [med, setMed] = useState([]);
    const { medId } = useParams();

    useEffect(() => {
        medsService.getOne(medId)
            .then(res => {
                console.log(res);
                setMed(res);
            })
    }, [medId])

    return (
        <div className="card mb-3">
            <img src={med.imgUrl} className="card-img-top" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{med.name}</h5>
                <p className="card-text">{med.description}</p>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
        </div>
    );
}

export default MedDetails;