import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import React, { useContext, useState } from "react";
import { FaEye, FaUserAlt, FaUserCircle, FaUserSecret } from "react-icons/fa";
import { FaEyeSlash, FaLocationArrow, FaLocationDot } from "react-icons/fa6";
import axios from "axios";
import AuthContext from "../../contexts/authContext/authContext";

const Login = ({ openDialog, handleDialogClose }: { openDialog: boolean; handleDialogClose: () => void; }): JSX.Element => {
    const { user, setUser } = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [creds, setCreds] = useState({
        username: "",
        password: "",
    });

    const handleToggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCreds(Object.assign({}, creds, {
            [name]: value
        }));
    }

    return (
        <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            PaperProps={{
                component: 'form',
                onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    try {
                        const resp = await axios.post("http://localhost:8000/api/login/", {
                            username: creds.username,
                            password: creds.password
                        });
                        if(resp) {
                            alert("Login Succesful");
                            localStorage.setItem("jwt", resp.data.access_token);
                            setUser(resp.data);
                        }
                        handleDialogClose();
                    } catch (err) {
                        alert("Invalid username/password")
                    }
                },
            }}
        >
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <div className="textfield" style={{ marginTop: "1rem" }}> 
                    <TextField name="username" onChange={handleChange} variant="outlined" style={{ width: "450px" }} label="Username" size="medium" helperText="Enter your username" InputProps={{
                        startAdornment: (
                            <FaUserCircle color="#1a237e"/>
                        ),
                        endAdornment: (<></>)
                    }}/>
                </div>
                <div className="textfield">
                    <TextField name="password" onChange={handleChange} variant="outlined" type={showPassword ? "text" : "password"} style={{ width: "450px" }} label="Password" size="medium" helperText="Enter your password" InputProps={{
                        startAdornment: (
                            <FaUserSecret color="#1a237e"/>
                        ),
                        endAdornment: (<IconButton onClick={handleToggleShowPassword}>
                            {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </IconButton>)
                    }}/>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDialogClose}>Cancel</Button>
                <Button type="submit">Login</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Login;