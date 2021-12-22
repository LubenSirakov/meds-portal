import './NotFound.css';
import './missing.png'

const NotFound = () => {
    return (
        <div className="not-found-div">
            <h2 id="not-found">404</h2>
            <img className="missing-img" src="https://api-blog.sienahealth.com/wp-content/uploads/2021/06/Missed-Birth-Control-Pills-What-To-Do-If-You-Forget-Your-Pills.png" alt="missing" />
            <h3 className="not-found-text">Oh, no! The page you are looking for seems to be missing...</h3>
        </div>
    );
};

export default NotFound