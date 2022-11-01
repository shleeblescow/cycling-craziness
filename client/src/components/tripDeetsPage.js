import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function TripDeetsPage(){

    const navigate = useNavigate();

    function handleSignout(){
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(navigate('/'))
    }

    return(

        <div>
            you? youre gonna go on this trip?  yyeaaahhhh right buckaroo lmaooooooo
            <button onClick={handleSignout}>
                get out of here GROSS
            </button>
        </div>



    )
}