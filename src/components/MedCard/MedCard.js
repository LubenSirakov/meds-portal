import './MedCard.css';

function MedCard() {

    return (
            <div className="card">
            <img src="https://static.framar.bg/product/20120919095806analgin-500.jpg" />
            <div className="card-body">
                <h2>Analgin 500mg</h2>
                <p>Аналгин таблетки съдържа активно вещество метамизол натрий, което се отнася към обезболяващите лекарства (аналгетици).</p>
                <button className="button"> <a href="#" class="btn btn-sm animated-button thar-four">Learn more</a> </button>
            </div>
        </div>
    );
}

export default MedCard;