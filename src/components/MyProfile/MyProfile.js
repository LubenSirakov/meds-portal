import './MyProfile.css';

function MyProfile() {
    return (
        <>
            <div className="profile-wrapper">
                <div className="profile">
                    <img src="https://media-exp1.licdn.com/dms/image/C4E03AQHevXrIEfUhvA/profile-displayphoto-shrink_800_800/0/1636621187597?e=1643846400&v=beta&t=c0O5dv1xF4EdFt7FZLuvSgdlM10z9HMSx6xDnnTz2kA" className="thumbnail" />
                    <div className="check"><i className="fas fa-check"></i></div>
                    <h3 className="name">Luben Sirakov</h3>
                    <p className="description">Junior Software Engineer at Betixon</p>
                    <div className="btn-wrapper">
                        <button type="button" className="btn">My Meds</button>
                        <button type="button" className="btn">Edit</button>
                        <button type="button" className="btn">Logout</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyProfile;