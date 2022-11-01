import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PostTrip(){

    const navigate = useNavigate();

    function handleSignout(){
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(navigate('/'))
    }

    return(

        <div>
            there's no way someone is gonna want to bikepack with you, esp for weeks on end, you SMELLY LOSER
            <button onClick={handleSignout}>
                get out of here GROSS
            </button>
        </div>



    )
}