import { Link } from "react-router-dom";

export function FourOFour() {
    return (
        <div className="four-o-four-container">
            <h1 className="fourOFourHeader">404 - Page Not Found</h1>
            <p>Oops! Looks like you have reached a page that does not exist.</p>
            <p>Return to the home page:</p>
            <Link to="/" className="fourOFourLink">
                Go to Home
            </Link>
        </div>
    );
}
