import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {v4 as uuid} from "uuid";

import RenderTripCard from './renderTripCard';

export default function Browse({ allTrips, fetchTrips, fetchJoinsData, currentUser }){

    const navigate = useNavigate();

    useEffect(() => {
        fetchTrips()
        fetchJoinsData()
    },[])



    return(

        <div className='p-4'>

            <br/>

            <h2 className="text-4xl font-bold dark:text-white">some sick trips</h2>
            <h3 className="text-3xl font-semibold text-gray-500 dark:text-white"><i>for your consideration</i></h3>
            
            
            <br/>

            {allTrips.map((eachTrip) => 
                <div key={uuid()} >
                    <RenderTripCard
                        thisTrip={eachTrip}
                        onButtonDrama={() => navigate(`/browsetrips/${eachTrip.id}`)}
                    />
                    <br/>
                </div>
            )}


        </div>



    )
}