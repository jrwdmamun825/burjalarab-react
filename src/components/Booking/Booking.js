import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Booking = () => {
    const [booking , setBooking] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    useEffect(()=>{
        fetch('http://localhost:5000/addBook?email='+loggedInUser.email ,{
            method : 'GET' ,
            headers :{
                'Content-Type': 'application/json' ,
                'authorization': `Bearer ${sessionStorage.getItem('token')}`
            }
        })
        .then(res=> res.json())
        .then(data => setBooking(data))
    } ,[])
    
    return (
        <div>
            <h2>total : {booking.length}</h2>

            {
                booking.map(data => <li>email: {data.email} start: {data.checkIn} to {data.checkout}</li>)
            }
        </div>
    );
};

export default Booking;