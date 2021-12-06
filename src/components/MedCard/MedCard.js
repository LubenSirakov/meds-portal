import './MedCard.css';

function MedCard({
    med
}) {

    return (
            <div className="card">
            <img src={med.imgUrl} />
            <div className="card-body">
                <h2>{med.name}</h2>
                <p>{med.description}</p>
                <button className="button"> <a href="#" class="btn btn-sm animated-button thar-four">Learn more</a> </button>
            </div>
        </div>
    );
}

export default MedCard;