import { Button, Paper, TextField } from "@mui/material";
import { FaLocationArrow } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

import "./booking.css";
import { useContext, useState } from "react";
import Login from "../auth/Login";
import AuthContext from "../../contexts/authContext/authContext";
import axios from "axios";
import AvailableTrains from "../availability/AvailableTrains";

const Booking = (): JSX.Element => {
    const { user } = useContext(AuthContext);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchQuery, setSearchQuery] = useState({
        source: "",
        destination: ""
    });
    const [openTrainDialog, setOpenTrainDialog] = useState(false);
    const [trains, setTrains] = useState<any[]>([]);
    const handleOpenDialog = () => {
        setOpenDialog(true);
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    }

    const handleSearchQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setSearchQuery(Object.assign({}, searchQuery, {
            [name]: value
        }));
    }

    const handleSearch = async  (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(!user) {
            setOpenDialog(true);
        } else {
            const resp = await axios.get('http://localhost:8000/api/trains/availability/', {
                params: {
                    source: searchQuery.source,
                    destination: searchQuery.destination
                },
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("jwt")}`
                }
            });
            setTrains(Object.assign([], resp.data));
            setOpenTrainDialog(true);
        }
    }

    return (
        <Paper className="booking-container">
            <AvailableTrains openDialog={openTrainDialog} handleClose={() => setOpenTrainDialog(false)} trains={trains} />
            <div className="card-header">Start Booking</div>
            <form onSubmit={handleSearch}>
                <div className="textfield">
                    <TextField required variant="outlined" name="source" onChange={handleSearchQueryChange} label="Source Station" size="medium" helperText="Enter your source station" InputProps={{
                        startAdornment: (
                            <FaLocationArrow color="#1a237e" />
                        )
                    }} />
                </div>
                <div className="textfield">
                    <TextField required variant="outlined" name="destination" onChange={handleSearchQueryChange} label="Destination Station" size="medium" helperText="Enter your destination station" InputProps={{
                        startAdornment: (
                            <FaLocationDot color="#1a237e" />
                        )
                    }} />
                </div>
                <div className="button-cont">
                    <Button type="submit" variant="contained" className="search-bttn" endIcon={<FaSearch />}>
                        Search
                    </Button>
                </div>
            </form>
            {localStorage.getItem("jwt") ? <div className="action-cont text-end mt-[2rem]">
                <Button onClick={() => {localStorage.removeItem("jwt"); window.location.reload(); }}>
                    Logout
                </Button></div> : <div className="action-cont text-end mt-[2rem]">
                <Button onClick={handleOpenDialog}>
                    Admin Login
                </Button>
                <div className="vertical-divider" />
                <Button onClick={handleOpenDialog}>
                    User Login
                </Button>
            </div>}
            <Login openDialog={openDialog} handleDialogClose={handleCloseDialog} />
        </Paper>
    );
}

export default Booking;