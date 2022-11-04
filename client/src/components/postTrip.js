import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TripForm from './tripForm';

export default function PostTrip({currentUser}){

    const navigate = useNavigate();

    console.log(currentUser)

    function handleSignout(){
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(navigate('/'))
    }

    function navDrama(){
        navigate('/browsetrips')
    }

    function moreNavDrama() {
        navigate(`/users/${currentUser.id}`)
    }

    return(

        <div>
            <button onClick={handleSignout}>
                get out of here GROSS
            </button>

            <br/><br/>

            <button onClick={navDrama}>
                    {'<~'} nvm take me back to the other trips
            </button>

            <br/><br/>

            <button onClick={moreNavDrama}>
                let me look at how cool I am, see me thru their eyes
            </button>


            <br/><br/>
            
            
            
            there's no way someone is gonna want to bikepack with you, esp for weeks on end, you SMELLY LOSER

            <br/><br/>

            <TripForm 
                currentUser={currentUser}
            />


        </div>

    )
}