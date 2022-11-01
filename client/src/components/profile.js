import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile({currentUser}){

    const navigate = useNavigate();

    function handleSignout(){
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(navigate('/'))
    }

    return(

        <div>
            pls jsut leave
            <p>{currentUser.username}</p>
            <button onClick={handleSignout}>
                get out of here GROSS
            </button>
        </div>



    )
}