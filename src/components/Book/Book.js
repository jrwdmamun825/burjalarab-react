import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Booking from '../Booking/Booking';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const { bedType } = useParams();
    const [selectedDate, setSelectedDate] = useState({
        checkIn : new Date() ,
        checkOut : new Date(),
    });
    const handleCheckInDate = (date) => {
        // console.log(date)
        const newDate = {...selectedDate}
        newDate.checkIn = date ;
        setSelectedDate(newDate);
    };
    const handleCheckOutDate = (date) => {
        // console.log(date)
        const newDate = {...selectedDate}
        newDate.checkOut = date ;
        setSelectedDate(newDate);
    };
    const handleClick = () => {
        const newBooking = {...loggedInUser , ...selectedDate} ;
        console.log('click')
        fetch('http://localhost:5000/addBook' , {
            method : 'POST' ,
            headers: {'Content-type': 'application/json '},
            body: JSON.stringify(newBooking),
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
        })
    }


    return (
        <div style={{ textAlign: 'center' }}>
            <h1> hey {loggedInUser.name} ! Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>


            {/* time set */}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check in date"
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check out date"
                        format="MM/dd/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                   
                </Grid>
                <Button variant="contained" color="primary" onClick={handleClick}>
                      bookNow
                    </Button>
            </MuiPickersUtilsProvider>
            <Booking></Booking>
        </div>




    );
};

export default Book;