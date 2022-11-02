import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as uuid} from "uuid";

import RenderTripCard from './renderTripCard';

export default function Browse({ allTrips, fetchTrips, currentUser }){

    const navigate = useNavigate();

    useEffect(() => {
        fetchTrips()
    },[])

    function handleSignout(){
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(navigate('/'))
    }

    function moreNavDrama() {
        navigate(`/users/${currentUser.id}`)
    }

    console.log(currentUser)



    return(

        <div>


            <button onClick={handleSignout}>
                get out of here GROSS
            </button>

            <button onClick={moreNavDrama}>
                let me look at how cool I am, see me thru their eyes
            </button>

            <br/><br/>

            <h1>oooohhhh so you think you're cool enough to go on a bikepacking trip?  what a LOSERERSIHF:OSIHfsfIHSFD</h1>
            
            <br/><br/>

            {allTrips.map((eachTrip) => 
                <RenderTripCard
                    key={uuid()} 
                    thisTrip={eachTrip}
                    onButtonDrama={() => navigate(`/browsetrips/${eachTrip.id}`)}
                />
            )}


        </div>



    )
}