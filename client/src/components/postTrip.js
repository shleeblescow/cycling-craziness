import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TripForm from './tripForm';

export default function PostTrip({currentUser}){

    const navigate = useNavigate();

    console.log(currentUser)


    return(

        <div>

            <br/><br/>

            there's no way someone is gonna want to bikepack with you, esp for weeks on end, you SMELLY LOSER

            <br/><br/>

            <TripForm 
                currentUser={currentUser}
            />


        </div>

    )
}