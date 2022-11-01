import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function About(){

    const navigate = useNavigate();

    function handleSignout(){
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(navigate('/'))
    }

    return(

        <div>
            i think i'm so cool for making this webstie
            <button onClick={handleSignout}>
                get out of here GROSS
            </button>
        </div>



    )
}