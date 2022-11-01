import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Browse(){

    const navigate = useNavigate();

    function handleSignout(){
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(navigate('/'))
    }

    return(

        <div>
            oooohhhh so you think you're cool enough to go on a bikepacking trip?  what a LOSERERSIHF:OSIHfsfIHSFD
            <button onClick={handleSignout}>
                get out of here GROSS
            </button>
        </div>



    )
}