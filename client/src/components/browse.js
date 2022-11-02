import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as uuid} from "uuid";

import RenderTripCard from './renderTripCard';

export default function Browse({ allTrips, fetchTrips }){

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



    return(

        <div>


            <button onClick={handleSignout}>
                get out of here GROSS
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