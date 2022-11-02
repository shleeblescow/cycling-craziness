import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile({currentUser}){

    const navigate = useNavigate();

    // might have to push these up later but chillin for now i think
    const [joinedTrips, setJoinedTrips] = useState([])
    const [createdTrips, setCreatedTrips] = useState([])

    useEffect(() => {
        fetch('/joinedtrips')
        .then((res) => {
            if (res.ok) {
                res.json()
                .then((joinedTrips) => {
                    setJoinedTrips(joinedTrips)
                    console.log(joinedTrips)
                })
            } else {
                console.log('loser')
            }
        })
        fetch('/createdtrips')
        .then((res) => {
            if (res.ok) {
                res.json()
                .then((createdTrips) => {
                    setCreatedTrips(createdTrips)
                    console.log(createdTrips)
                })
            }
        })

    },[])

    function handleSignout(){
        fetch('/logout', {
            method: 'DELETE',
        })
        .then(navigate('/'))
    }

    // console.log(createdTrips)
    // console.log(joinedTrips)



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