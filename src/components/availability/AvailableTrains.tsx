import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const AvailableTrains = ({ trains, openDialog, handleClose }: { trains: any[]; openDialog: boolean; handleClose: () => void; }): JSX.Element => {
    return (
        <Dialog
            open={openDialog}
            onClose={handleClose}

        >
            <DialogTitle>Available Trains</DialogTitle>
            <DialogContent>
                {trains.map((train, idx) => {
                    return (
                    <div key={idx}>
                        Train Name: {train.train_name}
                        <br />
                        Available Seats: {train.available_seats}
                    </div>
                    )
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Book</Button>
            </DialogActions>
        </Dialog>
    );
}

export default AvailableTrains;