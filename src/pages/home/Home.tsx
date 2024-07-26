import Booking from "../../components/booking/Booking";

import "./home.css";

const Home = (): JSX.Element => {
    return (
        <div className="home-container">
            <Booking />
        </div>
    );
}

export default Home;